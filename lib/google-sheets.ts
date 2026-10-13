// Real-time synchronization to DoorStep Diva Google Sheets CRM
import { normalizeIndianPhone } from './booking-utils'

const GOOGLE_SHEET_WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbyNgHQOM87tqzEvsahz_GVIzQxlrmWewmrSYDSqULmCbA0wBPEh_Z3tgQJ0Y7rTQiyQ6w/exec'

interface SyncBookingParams {
  customer_name: string
  customer_phone: string
  customer_email?: string
  customer_address?: string
  service_type: string
  city: string
  appointment_date?: string
  appointment_time?: string
  total_estimate?: number
  notes?: string
}

export async function syncBookingToGoogleSheets(data: SyncBookingParams) {
  try {
    const cleanPhone = normalizeIndianPhone(data.customer_phone)
    const isAcademy = data.service_type.toLowerCase().includes('academy') || 
                      data.service_type.toLowerCase().includes('course') || 
                      data.service_type.toLowerCase().includes('workshop') ||
                      (data.customer_address && data.customer_address.includes('Academy'))

    const isKarwaChauth = data.service_type.toLowerCase().includes('karwa') ||
                          data.service_type.toLowerCase().includes('chaand') ||
                          data.service_type.toLowerCase().includes('shringaar') ||
                          data.service_type.toLowerCase().includes('mehendi') ||
                          (data.notes && data.notes.toLowerCase().includes('karwa'))

    const dateStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    const cityStr = data.city ? data.city.charAt(0).toUpperCase() + data.city.slice(1) : 'Lucknow'

    let code = ''

    if (isAcademy) {
      // Push to 'Academy & Workshop Leads'
      code = `
        var sheet = ss.getSheetByName('Academy & Workshop Leads');
        if (!sheet) sheet = ss.insertSheet('Academy & Workshop Leads');
        var lastRow = sheet.getLastRow();
        var nextSr = lastRow; // Header is row 1
        var rowData = [
          nextSr,
          '${dateStr}',
          ${JSON.stringify(data.customer_name)},
          ${JSON.stringify(cleanPhone)},
          ${JSON.stringify(data.service_type)},
          ${JSON.stringify(cityStr)},
          'Website Academy Form',
          'Admission Lead (New)',
          ${JSON.stringify(data.notes || 'Website lead submission')},
          '=HYPERLINK("https://wa.me/91${cleanPhone}", "Chat on WhatsApp")'
        ];
        sheet.appendRow(rowData);
        var newRowNum = sheet.getLastRow();
        sheet.setRowHeight(newRowNum, 26);
        sheet.getRange(newRowNum, 1, 1, 10).setBackground(newRowNum % 2 === 0 ? '#FFF8FA' : '#FFFFFF');
        sheet.getRange(newRowNum, 1, 1, 10).setFontFamily('Google Sans').setFontSize(9).setVerticalAlignment('middle');
        sheet.getRange(newRowNum, 1).setHorizontalAlignment('center');
        sheet.getRange(newRowNum, 2).setHorizontalAlignment('center');
        sheet.getRange(newRowNum, 4).setNumberFormat('@').setHorizontalAlignment('center');
        sheet.getRange(newRowNum, 10).setHorizontalAlignment('center').setFontColor('#25D366').setFontWeight('bold');
        return { success: true, sheet: 'Academy', row: newRowNum };
      `
    } else if (isKarwaChauth) {
      // Push to 'Karwa Chauth Festive Leads'
      code = `
        var sheet = ss.getSheetByName('Karwa Chauth Leads');
        if (!sheet) sheet = ss.insertSheet('Karwa Chauth Leads');
        var lastRow = sheet.getLastRow();
        var nextSr = lastRow;
        var rowData = [
          nextSr,
          '${dateStr}',
          ${JSON.stringify(data.customer_name)},
          ${JSON.stringify(cleanPhone)},
          ${JSON.stringify(data.service_type)},
          ${JSON.stringify(cityStr + (data.customer_address ? ' - ' + data.customer_address.substring(0, 30) : ''))},
          ${JSON.stringify(data.appointment_date ? data.appointment_date + ' (' + (data.appointment_time || 'Flexible') + ')' : 'Flexible Slot')},
          'Festive Slot Pending Confirmation',
          ${JSON.stringify(data.notes || 'Karwa Chauth festive request')},
          '=HYPERLINK("https://wa.me/91${cleanPhone}", "Chat on WhatsApp")'
        ];
        sheet.appendRow(rowData);
        var newRowNum = sheet.getLastRow();
        sheet.setRowHeight(newRowNum, 26);
        sheet.getRange(newRowNum, 1, 1, 10).setBackground('#FFF5F5');
        sheet.getRange(newRowNum, 1, 1, 10).setFontFamily('Google Sans').setFontSize(9).setVerticalAlignment('middle');
        sheet.getRange(newRowNum, 1).setHorizontalAlignment('center');
        sheet.getRange(newRowNum, 2).setHorizontalAlignment('center');
        sheet.getRange(newRowNum, 4).setNumberFormat('@').setHorizontalAlignment('center');
        sheet.getRange(newRowNum, 10).setHorizontalAlignment('center').setFontColor('#25D366').setFontWeight('bold');
        return { success: true, sheet: 'Karwa Chauth', row: newRowNum };
      `
    } else {
      // Push to 'Salon Bookings'
      const priorityTier = cityStr.toLowerCase().includes('lucknow') || cityStr.toLowerCase().includes('ayodhya') || cityStr.toLowerCase().includes('delhi')
        ? 'Tier 1: Priority Local (Call to Confirm)'
        : 'Tier 2: Regional Lead (Confirm Area)'
      const leadStage = 'New Booking Request'
      const recAction = data.appointment_date ? `Call to Confirm Slot for ${data.appointment_date} ${data.appointment_time || ''}` : 'Call Coordinator / WhatsApp Welcome'

      code = `
        var sheet = ss.getSheetByName('Salon Bookings');
        if (!sheet) sheet = ss.insertSheet('Salon Bookings');
        var lastRow = sheet.getLastRow();
        var nextSr = lastRow;
        var rowData = [
          nextSr,
          '${priorityTier}',
          ${JSON.stringify(data.customer_name)},
          ${JSON.stringify(cleanPhone)},
          ${JSON.stringify(cityStr + (data.customer_address ? ' - ' + data.customer_address.substring(0, 30) : ''))},
          '${leadStage}',
          'Website Booking Engine',
          ${JSON.stringify(recAction)},
          '=HYPERLINK("https://wa.me/91${cleanPhone}", "Direct WhatsApp Link")'
        ];
        sheet.appendRow(rowData);
        var newRowNum = sheet.getLastRow();
        sheet.setRowHeight(newRowNum, 26);
        sheet.getRange(newRowNum, 1, 1, 9).setBackground('#ECFDF5');
        sheet.getRange(newRowNum, 1, 1, 9).setFontFamily('Google Sans').setFontSize(9).setVerticalAlignment('middle');
        sheet.getRange(newRowNum, 1).setHorizontalAlignment('center');
        sheet.getRange(newRowNum, 4).setNumberFormat('@').setHorizontalAlignment('center');
        sheet.getRange(newRowNum, 9).setHorizontalAlignment('center').setFontColor('#25D366').setFontWeight('bold');
        return { success: true, sheet: 'Salon', row: newRowNum };
      `
    }

    const res = await fetch(GOOGLE_SHEET_WEBAPP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'eval', code }),
    })

    const result = await res.json()
    return result
  } catch (error) {
    console.error('❌ [GOOGLE SHEETS SYNC ERROR]:', error)
    return { success: false, error: String(error) }
  }
}

import React from 'react';
import QRCode from 'qrcode.react';


const QR_CODE_BASE_URL_TESTING = 'http://fa8b8e0c.ngrok.io/api/postQRCode/';
const QR_CODE_BASE_URL_PROD = 'https://projects.premiumspread.com/api/postQRCode/';

function ScheduleQRCode({match,toggle}){

    const qr_token = match.params.qr_token;

    return(
        <a href="#" onClick={() => toggle(`${QR_CODE_BASE_URL_PROD}${qr_token}`)}>
            <QRCode
                size={600}
                includeMargin={true}
                value={`${QR_CODE_BASE_URL_PROD}${qr_token}`}
            />
        </a>
    );
}

export default ScheduleQRCode;

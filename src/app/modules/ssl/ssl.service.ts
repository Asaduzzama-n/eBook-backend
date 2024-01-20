import axios from 'axios';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const initPayment = async (payload: any) => {
  try {
    const data = {
      store_id: config.ssl.storeId,
      store_passwd: config.ssl.storePass,
      total_amount: payload.total_amount,
      currency: 'BDT',
      tran_id: payload.tran_id, // use unique tran_id for each api call
      success_url: `http://localhost:5000/api/v1/payment/success/${payload.invoiceId}`,
      fail_url: `http://localhost:5000/api/v1/payment/fail/${payload.invoiceId}`,
      cancel_url: `http://localhost:5000/api/v1/payment/cancel/${payload.invoiceId}`,
      ipn_url: 'http://localhost:5000/api/v1/payment/webhook',
      shipping_method: 'N/A',
      product_name: 'eBook',
      product_category: 'Payment',
      product_profile: 'User',
      cus_name: payload.cus_name,
      cus_email: payload.cus_email,
      cus_add1: 'Dhaka',
      cus_add2: 'Dhaka',
      cus_city: 'Dhaka',
      cus_state: 'Dhaka',
      cus_postcode: '1000',
      cus_country: 'Bangladesh',
      cus_phone: '01711111111',
      cus_fax: '01711111111',
      ship_name: 'Customer Name',
      ship_add1: 'Dhaka',
      ship_add2: 'Dhaka',
      ship_city: 'Dhaka',
      ship_state: 'Dhaka',
      ship_postcode: 1000,
      ship_country: 'Bangladesh',
    };

    const response = await axios({
      method: 'post',
      url: config.ssl.sslPaymentUrl,
      data: data,
      headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    });

    return response.data;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Payment error');
  }
};

const validate = async (data: any) => {
  try {
    const response = await axios({
      method: 'GET',
      url: `${config.ssl.sslValidationUrl}?val_id=${data.val_id}&store_id=${config.ssl.storeId}&store_passwd=${config.ssl.storePass}`,
    });
    return response.data;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Payment validation error');
  }
};

export const sslService = {
  initPayment,
  validate,
};

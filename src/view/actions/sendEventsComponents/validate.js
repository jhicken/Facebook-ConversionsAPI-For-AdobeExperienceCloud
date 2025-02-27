/**
 * (c) Facebook, Inc. and its affiliates. Confidential and proprietary.
 */
export default (values) => {
  const errors = {};

  if (values.isTestEvent && !values.testEventCode) {
    errors.testEventCode = {
      message: 'To send a test event, Please enter a Test Event Code',
      type: 'required'
    };
  }

  if (!values.eventName) {
    errors.eventName = {
      message: 'Please specify an event name',
      type: 'required'
    };
  }

  if (!values.eventTime) {
    errors.eventTime = {
      message: 'Please specify then event time',
      type: 'required'
    };
  }

  if (values.clientUserAgent && !values.clientIpAddress) {
    errors.clientIpAddress = {
      message: 'IP address is required if user agent is provided',
      type: 'required'
    }
  }

  if (!values.clientUserAgent && values.clientIpAddress) {
    errors.clientUserAgent = {
      message: 'User agent is required if IP address is provided',
      type: 'required'
    }
  }

  if (
    values.actionSource &&
    values.actionSource.toLowerCase() === 'website'
    && !values.clientUserAgent
  ) {
    errors.clientUserAgent = {
      message: 'For website events, please specify the Client User Agent',
      type: 'required'
    };
  }

  if (
    values.actionSource &&
    values.actionSource.toLowerCase() === 'website'
    && !values.clientIpAddress
  ) {
    errors.clientIpAddress = {
      message: 'For website events, please specify the Client IP Address',
      type: 'required'
    };
  }

  if (
    values.actionSource &&
    values.actionSource.toLowerCase() === 'website'
    && !values.eventSourceUrl
  ) {
    errors.eventSourceUrl = {
      message: 'For website events, please specify the Event Source URL',
      type: 'required'
    };
  }


  if (!values.actionSource) {
    errors.actionSource = {
      message: 'Please specify the Action Source',
      type: 'required'
    };
  }

  if (values.eventName && values.eventName.toLowerCase() === 'purchase') {
    try {
       const payload = JSON.parse(values.customData);
       if (!payload.hasOwnProperty('currency') || !payload.hasOwnProperty('value')) {
         errors.customData = {
          message: 'The parameters "currency" and "value" are required for Purchase events',
          type: 'required'
        }
       }
    } catch (e) {
      errors.customData = {
        message: 'Please enter a valid JSON payload',
        type: 'required'
      };
    }
  }

  if (values.customData) {
    try {
       JSON.parse(values.customData);
    } catch (e) {
      errors.customData = {
        message: 'Please enter a valid JSON payload',
        type: 'required'
      };
    }
  }

  return errors;
};

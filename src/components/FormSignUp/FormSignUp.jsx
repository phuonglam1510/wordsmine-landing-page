import React, { useState } from "react";
import { Form, Input, message, Checkbox } from "antd";
import ButtonLarge from "../ButtonLarge/ButtonLarge";
import { API_SIGN_UP } from "../../utils/constant";
import { useTranslation } from 'react-i18next';

import "./FormSignUp.scss";

const FormSignUp = () => {
  const { t } = useTranslation();

  const [form] = Form.useForm();
  const [checkAgreePolicy, setcheckAgreePolicy] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onCheckboxChange = (e) => {
    setcheckAgreePolicy(!checkAgreePolicy);
  };

  const submit = async (values) => {
    return fetch(API_SIGN_UP, {
      method: "POST",
      body: JSON.stringify({ ...values }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        // status = response.status;
        return response.json();
      })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw err;
      });
  };

  const onCheck = async () => {
    setIsLoading(true);
    try {
      const values = await form.validateFields();
      if (checkAgreePolicy) {
        try {
          console.debug("result: ", values);
          await submit(values);
          message.success("Thanks for your submission");
          form.resetFields();
        } catch (err) {
          console.debug("result: ", err);
          message.error("Something went wrong, please try later");
        }
      } else {
        message.warning("Please check agree policy to submit form");
      }
    } catch (err) {
      console.debug("result: ", err);
    }
    setIsLoading(false);
  };

   const validatePhone = (_rule, value, callback) => {
        const phoneRegex = /^[+]?[(]?[0-9]{4}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{3,4}$/im;
        if (!value) {
            console.debug("empty")
            // empty
            callback();
            return
        }
        const isMatch = value.match(phoneRegex);
        if (!isMatch && value !== '') {
            callback('Invalid phone')
        } else {
            callback();
        }
    };

  return (
    <section className="form">
      <Form id="form-cta" form={form} name="dynamic_rule">
        <Form.Item
          name="fullName"
          rules={[
            {
              required: true,
              message: "Please input your full name",
            },
          ]}
        >
          <div className="custom-input">
            <span className="custom-input__placeholder">{t('ctaFullName')}</span>
            <Input placeholder="David Copperfield" />
          </div>
        </Form.Item>
        <Form.Item
          name="email"
          type="email"
          rules={[
            {
              required: true,
              message: "Please input your email",
            },
            {
              type: "email",
              message: "Email is not valid",
            },
          ]}
        >
          <div className="custom-input">
            <span className="custom-input__placeholder">{t('ctaEmail')}</span>
            <Input placeholder="davicopper@email.com" type="email" />
          </div>
        </Form.Item>

         <Form.Item
          name="phone"
          rules={[
            { validator: validatePhone }
          ]}
        >
          <div className="custom-input">
            <span className="custom-input__placeholder">{t('ctaPhone')}</span>
            <Input placeholder="0999 222 888" />
          </div>
        </Form.Item>

        <Form.Item name="interest">
          <div className="custom-input">
            <span className="custom-input__placeholder">{t('ctaInterest')}</span>
            <Input placeholder="Learn vocabulary, grammar, etc" />
          </div>
        </Form.Item>

        <Form.Item className="check-box">
          <Checkbox checked={checkAgreePolicy} onChange={onCheckboxChange}>
            {" "}
            {t('ctaRule')}
          </Checkbox>
        </Form.Item>

        <Form.Item className="form__btn-start">
          <ButtonLarge type="primary" onClick={onCheck} loading={isLoading}>
            {t('ctaButton')}
          </ButtonLarge>
        </Form.Item>
      </Form>
    </section>
  );
};

export default FormSignUp;

import React, { useState } from 'react';
import { Form, Formik, FormikProps } from 'formik';
import Input from '../../../components/generalComponents/Input';
import { MultiStepFormBox, Title, TwoColumnInputFlex } from '../../../styles';
import { OfficerDetailsSchema } from '../../../validators/facility.validators';
import { FacilityDataType, OfficerDetailsType } from '../../../types/Facility/facility.types';
import { handleErrors, makeApiCall } from '../../../services/connectivityService';
import { ToastTypes } from '../../../types';
import { toast } from 'react-toastify';
import { constructOrganizationPayload } from '../../../helpers/pages/organization/organizationForm.functions';
import MultiFormFooter from '../../../components/generalComponents/MultiFormFooter';
import PhoneInput from '../../../components/generalComponents/PhoneInput';

interface FormProps {
    title: string;
    data: FacilityDataType;
    setData: (data: FacilityDataType) => void;
    next: () => void;
    back: () => void;
    isSelfOnboard?: boolean;
}

const AddOfficerForm: React.FC<FormProps> = ({ title, next, data, setData, back }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const { firstName, lastName, email, phoneNumber } = data?.officerDetails ?? {};

    const initialValues = {
        firstName,
        lastName,
        email,
        phoneNumber,
    };

    const notify = (type: ToastTypes, msg: string) =>
        toast(msg, { type, position: 'top-center', theme: 'colored' });

    const handleSubmit = async (values: OfficerDetailsType) => {
        setLoading(true);

        const payload = constructOrganizationPayload({
            ...data,
            officerDetails: values,
        });

        const response: any = await makeApiCall(
            'post',
            `${import.meta.env.VITE_MAIN_API_URL}/organizations`,
            payload,
        );

        setLoading(false);

        if (response.code === 201) {
            setData({
                ...data,
                officerDetails: values,
                shortCode: response.data.shortCode,
            });
            next();
        } else {
            await handleErrors(response, notify);
        }
    };

    return (
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={OfficerDetailsSchema}
            >
                {(formik: FormikProps<OfficerDetailsType>) => {
                    const disabled = Object.keys(formik.errors).length !== 0;
                    return (
                        <div>
                            <Form style={{ height: 'calc(100vh - 230px)' }}>
                                <MultiStepFormBox>
                                    <Title>{title}</Title>
                                    <div>
                                        <TwoColumnInputFlex>
                                            <Input
                                                name='firstName'
                                                type='text'
                                                title='First Name'
                                                removeMarginTop={true}
                                                required
                                            />
                                            <Input
                                                name='lastName'
                                                type='text'
                                                title='Last Name'
                                                removeMarginTop={true}
                                                required
                                            />
                                        </TwoColumnInputFlex>
                                        <Input
                                            name='email'
                                            type='text'
                                            disabled={Boolean(data.accessToken)}
                                            title='Email Address of Authorized officer'
                                            required
                                        />
                                        <PhoneInput
                                            inputProps={{
                                                name: 'phoneNumber',
                                                title: 'Phone Number',
                                                required: true,
                                            }}
                                            error={
                                                formik.getFieldMeta('phoneNumber').touched
                                                    ? formik.errors.phoneNumber
                                                    : ''
                                            }
                                            value={formik.values.phoneNumber}
                                            onChange={(value) => {
                                                formik.setFieldValue('phoneNumber', value);
                                            }}
                                            onBlurr={() => {
                                                formik.setFieldTouched('phoneNumber', true);
                                            }}
                                        />
                                    </div>
                                </MultiStepFormBox>
                                <MultiFormFooter
                                    disabled={disabled}
                                    onBackButtonClick={back}
                                    loading={loading}
                                />

                                {/* <input type="text" onBlur={(e)=>()} /> */}
                            </Form>
                        </div>
                    );
                }}
            </Formik>
        </>
    );
};

export default AddOfficerForm;

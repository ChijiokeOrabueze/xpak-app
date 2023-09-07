import React, { useEffect, useState } from 'react';
import { Form, Formik, FormikProps } from 'formik';
import Input from '../../../components/generalComponents/Input';
import { MultiStepFormBox, Title } from '../../../styles';
import { FacilityDetailsSchema } from '../../../validators/facility.validators';
import Select from '../../../components/generalComponents/Select';
import { FacilityDataType, FacilityDetailsType } from '../../../types/Facility/facility.types';
import { constructSelectOptions, fetchLovContent } from '../../../helpers/formFunctions';
import MultiFormFooter from '../../../components/generalComponents/MultiFormFooter';
import Address from '../../../templates/address';
import { handleErrors, makeApiCall } from '../../../services/connectivityService';
import { notify } from '../../../helpers/notifications';
import CustomSelect from '../../../components/generalComponents/CustomSelect';

interface FormProps {
    title: string;
    data: FacilityDataType;
    setData: (data: FacilityDataType) => void;
    next: () => void;
    back: () => void;
    isSelfOnboard?: boolean;
}

const FacilityDetailsForm: React.FC<FormProps> = ({ title, next, data, setData, back }) => {
    const [orgTypeOptions, setOrgTypeOptions] = useState<Array<string>>([]);
    const [postCodeError, setPostCodeError] = useState('');
    const [loadingAddress, setLoadingAddress] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const {
        CQCRegistrationNumber,
        nameOfOrganization,
        organizationType,
        organizationPostCode,
        addressLine1,
        addressLine2,
        townOrCity,
        county,
    } = data?.facilityDetails ?? {};

    const initialValues = {
        CQCRegistrationNumber,
        nameOfOrganization,
        organizationType,
        organizationPostCode,
        addressLine1,
        addressLine2,
        townOrCity,
        county,
    };

    useEffect(() => {
        const fetchData = async () => {
            const options = await fetchLovContent(import.meta.env.VITE_ORGANIZATION_TYPE_CODE);
            setOrgTypeOptions(options);
        };

        fetchData();
    }, []);

    const handleSubmit = async (values: FacilityDetailsType) => {
        if (postCodeError || loadingAddress) return;

        setLoading(true);

        const organizationCheckResponse: any = await makeApiCall(
            'post',
            `${import.meta.env.VITE_MAIN_API_URL}/organizations/verify`,
            { name: values.nameOfOrganization },
        );

        let flowCanContinue = false;
        if (organizationCheckResponse.code === 201 || organizationCheckResponse.code === 200) {
            if (organizationCheckResponse?.data?.organizationExists) {
                notify('error', 'An organization already exists with the name provided.');
            } else {
                flowCanContinue = true;
            }
        } else {
            await handleErrors(organizationCheckResponse, notify);
        }

        if (!flowCanContinue) {
            setLoading(false);
            return;
        }

        setData({
            ...data,
            facilityDetails: values,
        });

        next();
    };

    return (
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={FacilityDetailsSchema}
            >
                {(formik: FormikProps<FacilityDetailsType>) => {
                    const disabled =
                        Object.keys(formik.errors).length !== 0 ||
                        Boolean(postCodeError) ||
                        loadingAddress;
                    return (
                        <div>
                            <Form style={{ height: 'calc(100vh - 230px)' }}>
                                <MultiStepFormBox>
                                    <Title>{title}</Title>

                                    <div>
                                        <Input
                                            name='CQCRegistrationNumber'
                                            type='text'
                                            title='CQC Registration Number'
                                            required
                                            placeholder='Enter registration number'
                                        />
                                        <Input
                                            name='nameOfOrganization'
                                            type='text'
                                            title='Name of Organization'
                                            placeholder='Enter name of organization'
                                            required
                                        />
                                        <CustomSelect
                                            name='organizationType'
                                            options={constructSelectOptions(orgTypeOptions)}
                                            placeholder='Pick an option'
                                            title='Organization Type'
                                            required
                                        />
                                        <Address
                                            fields={{
                                                postCode: {
                                                    name: 'organizationPostCode',
                                                    title: 'Organization Post Code',
                                                },
                                                addressLine1: {
                                                    name: 'addressLine1',
                                                },
                                                addressLine2: {
                                                    name: 'addressLine2',
                                                },
                                                townOrCity: {
                                                    name: 'townOrCity',
                                                },
                                                county: {
                                                    name: 'county',
                                                },
                                            }}
                                            onSuggestionClick={(addr) => {
                                                formik.setFieldValue('townOrCity', addr.Place);
                                                formik.setFieldValue(
                                                    'addressLine1',
                                                    addr.StreetAddress,
                                                );
                                            }}
                                            onPostCodeChange={(value) => {
                                                formik.setFieldValue('organizationPostCode', value);
                                            }}
                                            handlePostCodeError={(err) => {
                                                setPostCodeError(err);
                                            }}
                                            postCodeError={postCodeError}
                                            showAlternatePostCodeError={
                                                !formik.errors.organizationPostCode
                                            }
                                            loadingAddress={loadingAddress}
                                            setLoadingAddress={setLoadingAddress}
                                        />
                                    </div>
                                </MultiStepFormBox>
                                <MultiFormFooter
                                    disabled={disabled}
                                    onBackButtonClick={back}
                                    loading={loading}
                                />
                            </Form>
                        </div>
                    );
                }}
            </Formik>
        </>
    );
};

export default FacilityDetailsForm;

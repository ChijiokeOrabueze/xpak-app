import React, { useState } from 'react';
import { MultiStepFormBox, SubTitle, Title } from '../../../styles';
import { FacilityDataType } from '../../../types/Facility/facility.types';
import { Form, Formik, FormikProps } from 'formik';
import { FacilityDocumentsSchema } from '../../../validators/facility.validators';
import Input from '../../../components/generalComponents/Input';
import { FileType } from '../../../constants';
import { handleErrors, makeApiCallWithFormData } from '../../../services/connectivityService';
import { ToastTypes } from '../../../types';
import { toast } from 'react-toastify';
import MultiFormFooter from '../../../components/generalComponents/MultiFormFooter';
import ErrorMessage from '../../../components/generalComponents/ErrorMessage';
import Button from '../../../components/generalComponents/Button';

interface FormProps {
    title: string;
    data: FacilityDataType;
    setData: (data: FacilityDataType) => void;
    next: () => void;
    back: () => void;
    isSelfOnboard?: boolean;
}
type FormData = {
    logo: string;
    legalDocument: string;
};

const UploadDocuments: React.FC<FormProps> = ({ title, next, data, back, isSelfOnboard }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [logo, setLogo] = useState<FileList | null>();
    const [legalDocument, setLegalDocument] = useState<FileList | null>();
    const [customErrors, setCustomErrors] = useState({
        logo: '',
        legalDocument: '',
    });

    const notify = (type: ToastTypes, msg: string) =>
        toast(msg, { type, position: 'top-center', theme: 'colored' });

    const handleSubmit = async () => {
        if (customErrors.legalDocument || customErrors.logo) {
            return;
        }

        if (!logo && !legalDocument) {
            notify('error', 'No file chosen.');
            return;
        }

        if (logo || legalDocument) {
            setLoading(true);
            const uploadData = new FormData();

            if (logo) {
                uploadData.append('logo', logo[0]);
            }
            if (legalDocument) {
                uploadData.append('legalDocument', legalDocument[0]);
            }

            const response = await makeApiCallWithFormData(
                'post',
                `${import.meta.env.VITE_MAIN_API_URL}/organizations/${data.shortCode}/documents`,
                uploadData,
                data.accessToken,
            );

            setLoading(false);

            if (response.code === 201 || response.code === 200) {
                next();
            } else {
                await handleErrors(response, notify);
            }
        } else {
            next();
        }
    };

    const checkError = (e: React.ChangeEvent<HTMLInputElement>, item: 'logo' | 'legalDocument') => {
        const file = e.target.files;
        const fileLimit = parseInt(import.meta.env.VITE_FILE_SIZE_LIMIT) || 3000000;
        if (file?.length && file[0].size >= fileLimit) {
            setCustomErrors({
                ...customErrors,
                [item]: `File should not be more than ${fileLimit / 1000000}MB`,
            });
            return false;
        }
        setCustomErrors({ ...customErrors, [item]: '' });
        return true;
    };

    return (
        <>
            <Formik
                initialValues={{ logo: '', legalDocument: '' }}
                onSubmit={handleSubmit}
                validationSchema={FacilityDocumentsSchema}
            >
                {(formik: FormikProps<FormData>) => {
                    const disabled =
                        Object.keys(formik.errors).length !== 0 ||
                        Boolean(customErrors.legalDocument || customErrors.logo) ||
                        !Boolean(logo?.length || legalDocument?.length);

                    return (
                        <div>
                            <Form style={{ height: 'calc(100vh - 230px)' }}>
                                <MultiStepFormBox>
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <Title>{title}</Title>
                                        {isSelfOnboard ? (
                                            <Button
                                                onClick={next}
                                                children={
                                                    <span
                                                        style={{
                                                            display: 'flex',
                                                            gap: '10px',
                                                            alignItems: 'center',
                                                        }}
                                                    >
                                                        <span>Skip</span>
                                                        <i className='fa fa-arrow-right'></i>
                                                    </span>
                                                }
                                                style={{
                                                    color: '#8091A7',
                                                    fontSize: '13px',
                                                    border: '1px solid #8091A7',
                                                    background: 'white',
                                                }}
                                            />
                                        ) : (
                                            ''
                                        )}
                                    </div>

                                    <div>
                                        <SubTitle style={{ marginBottom: 0 }}>
                                            Facility Logo
                                        </SubTitle>

                                        <Input
                                            type='file'
                                            title='File Upload'
                                            tempOnChange={(e) => {
                                                formik.setFieldValue('logo', e.target.value);
                                                if (checkError(e, 'logo')) {
                                                    setLogo(e.target.files);
                                                }
                                            }}
                                            name='logo'
                                            fileFormat={FileType.IMG}
                                        />
                                        <ErrorMessage
                                            showIcon
                                            moveDownAmount={5}
                                            error={customErrors.logo}
                                        />

                                        <SubTitle style={{ marginTop: '24px', marginBottom: 0 }}>
                                            Legal Document
                                        </SubTitle>
                                        <Input
                                            type='file'
                                            title='File Upload'
                                            tempOnChange={(e) => {
                                                formik.setFieldValue(
                                                    'legalDocument',
                                                    e.target.value,
                                                );
                                                if (checkError(e, 'legalDocument')) {
                                                    setLegalDocument(e.target.files);
                                                }
                                            }}
                                            name='legalDocument'
                                            fileFormat={FileType.ALL}
                                        />
                                        <ErrorMessage
                                            showIcon
                                            moveDownAmount={5}
                                            error={customErrors.legalDocument}
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

export default UploadDocuments;

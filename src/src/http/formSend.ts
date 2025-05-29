import axios from 'axios';
import { CompanyType, IDocumentsForm, IEmployersForm, IMainForm, IUserBankForm } from 'types/forms';

export const $api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

export const formSend = async (
  companyType: CompanyType,
  mainForm: IMainForm,
  requiredEmployerForm: IEmployersForm[],
  otherEmployers: IEmployersForm[],
  userBankForm: IUserBankForm[],
  documentsForm: IDocumentsForm[]
) => {
  const bank = userBankForm.map((bank) => ({
    bank: bank.banc,
    bic: bank.BIC,
    businessAcc: bank.businessAcc,
    city: bank.city,
    correspAcc: bank.correspAcc
  }));

  const othersEmployers = otherEmployers.map((employer) => ({
    email: employer.email,
    name: employer.name,
    phoneNumber: employer.phoneNumber,
    position: employer.position
  }));

  const requiredEmployers = requiredEmployerForm.map((employer) => ({
    email: employer.email,
    name: employer.name,
    phoneNumber: employer.phoneNumber,
    position: employer.position
  }));

  const main = {
    companyEmail: mainForm.companyEmail,
    companyFax: mainForm.companyFax,
    companyName: mainForm.companyName,
    companyPhone: mainForm.companyPhone,
    companySite: mainForm.companySite,
    companyType,
    country: mainForm.country,
    inn: mainForm.INN,
    kpp: mainForm.KPP,
    okopf: mainForm.OKOPF,
    okpo: mainForm.OKPO,
    ownershipForm: mainForm.ownershipForm
  };

  const fileToBase64 = async (file: Blob | undefined) => {
    return new Promise((resolve, reject) => {
      if (!file) {
        resolve(null); // Возвращаем null для пустых файлов
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const documents = await Promise.all(
    documentsForm
      .map(async (document) => {
        if (document.docFile) {
          return {
            docFile: await fileToBase64(document.docFile),
            docName: document.docName || document.docFile.name
          };
        }
        return null;
      })
      .filter(Boolean)
  );

  const requestData = {
    bank,
    documents,
    main,
    othersEmployers,
    requiredEmployers
  };

  try {
    await $api.post('/', requestData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return true;
  } catch (error) {
    console.error('Ошибка при отправке формы:', error);
    return false;
  }
};

import { Option } from 'components/shared/Select';
import { IText } from 'types/text';
import { CompanyType } from 'types/forms';

export const POLICY_TEXT: IText[] = [
  {
    title: 'Пользовательское соглашение сервиса platform.techcorp.com',
    paragraphs: [
      'Настоящее Соглашение (далее – «Соглашение») заключено между:',
      `Обществом с ограниченной ответственностью «ТехКорп» (ООО «ТехКорп»),
      ОГРН 1234567890123, ИНН 1234567890, юридический адрес: 123456, г. Москва, ул. Ленина, д. 1, стр. 1,
      именуемым в дальнейшем «Администрация сервиса», и`,
      `Физическим или юридическим лицом, зарегистрированным в соответствии с законодательством своей страны,
      именуемым в дальнейшем «Пользователь».`,
      `В соответствии с настоящим Соглашением Администрация сервиса предоставляет Пользователю доступ
      к платформе platform.techcorp.com (далее — «Сервис») для размещения, хранения и обработки данных,
      а также использования инструментов аналитики в рамках предоставляемых функциональных возможностей.`,
      'Стороны соглашаются, что:',
      // eslint-disable-next-line max-len
      '- использование Сервиса направлено на оптимизацию бизнес-процессов и повышение эффективности работы Пользователя;',
      '- обе стороны заинтересованы в корректной работе Сервиса и обязуются соблюдать условия настоящего Соглашения.'
    ]
  },
  {
    title: '1. ПРЕДМЕТ СОГЛАШЕНИЯ',
    isPrimaryTitle: true,
    paragraphs: [
      '1.1. Предметом настоящего Соглашения являются:',
      '1.1.1. Предоставление Пользователю доступа к функционалу Сервиса;',
      '1.1.2. Обязанность Пользователя предоставлять достоверные данные;',
      '1.1.3. Соблюдение конфиденциальности информации, размещаемой в Сервисе.',
      '1.2. Основные направления взаимодействия включают:',
      '1.2.1. Корректное использование возможностей Сервиса в соответствии с его назначением;',
      '1.2.2. Участие в улучшении работы платформы путем предоставления обратной связи.'
    ]
  },
  {
    title: '2. УСЛОВИЯ ОПЛАТЫ',
    isPrimaryTitle: true,
    paragraphs: [
      '2.1. Доступ к базовому функционалу Сервиса предоставляется на безвозмездной основе.',
      '2.2. Расширенный функционал доступен по подписке с ежемесячной или годовой оплатой:',
      '2.2.1. Стоимость месячной подписки составляет 5 000 (пять тысяч) рублей;',
      '2.2.2. Стоимость годовой подписки — 50 000 (пятьдесят тысяч) рублей (экономия 16,6%).',
      '2.3. Оплата производится:',
      '2.3.1. Для юридических лиц — по безналичному расчету на основании счета;',
      '2.3.2. Для физических лиц — банковской картой через платежный шлюз.',
      // eslint-disable-next-line max-len
      '2.4. Автоматическое продление подписки осуществляется, если Пользователь не отключил данную функцию за 3 дня до окончания текущего периода.'
    ]
  },
  {
    title: '3. СРОК ДЕЙСТВИЯ И ПОРЯДОК РАСТОРЖЕНИЯ',
    isPrimaryTitle: true,
    paragraphs: [
      '3.1. Соглашение вступает в силу с момента:',
      '3.1.1. Для незарегистрированных пользователей — начала использования Сервиса;',
      '3.1.2. Для зарегистрированных пользователей — принятия условий при регистрации.',
      '3.2. Срок действия:',
      '3.2.1. Бессрочно — для базового функционала;',
      '3.2.2. На период оплаченной подписки — для платных услуг.',
      '3.3. Расторжение:',
      // eslint-disable-next-line max-len
      '3.3.1. Пользователь вправе отказаться от услуг в личном кабинете (для платного тарифа — за 7 дней до конца периода);',
      '3.3.2. Администрация может расторгнуть Соглашение в одностороннем порядке при нарушении условий п. 1.1.2–1.1.3.',
      '3.4. При расторжении остаток средств за неиспользованный период платной подписки не возвращается.'
    ]
  },
  {
    title: '4. ОТВЕТСТВЕННОСТЬ СТОРОН',
    isPrimaryTitle: true,
    paragraphs: [
      '4.1. Администрация не несет ответственности за:',
      '4.1.1. Убытки, вызванные некорректными данными Пользователя;',
      '4.1.2. Сбои в работе Сервиса из-за действий третьих лиц или форс-мажорных обстоятельств.',
      '4.2. Пользователь обязан возместить ущерб при:',
      '4.2.1. Нарушении конфиденциальности данных других пользователей;',
      '4.2.2. Использовании Сервиса для противоправной деятельности.'
    ]
  }
];

export const POLICY_TEXT_EN: IText[] = [
  {
    title: 'User Agreement for the service platform.techcorp.com',
    paragraphs: [
      'This Agreement (hereinafter referred to as the "Agreement") is concluded between:',
      `Limited Liability Company "TechCorp" (LLC "TechCorp"),
      PSRN 1234567890123, TIN 1234567890, legal address: 123456, Moscow, Lenina St., bldg. 1, suite 1,
      hereinafter referred to as the "Service Administration", and`,
      `An individual or legal entity registered in accordance with the legislation of their country,
      hereinafter referred to as the "User".`,
      `Under this Agreement, the Service Administration provides the User with access
      to the platform.techcorp.com platform (hereinafter referred to as the "Service") for data storage, processing,
      and use of analytics tools within the provided functionality.`,
      'The Parties agree that:',
      '- use of the Service is aimed at optimizing business processes and improving the Users operational efficiency;',
      // eslint-disable-next-line max-len
      '- both Parties are interested in the proper operation of the Service and undertake to comply with the terms of this Agreement.'
    ]
  },
  {
    title: '1. SUBJECT OF THE AGREEMENT',
    isPrimaryTitle: true,
    paragraphs: [
      '1.1. The subject of this Agreement includes:',
      '1.1.1. Providing the User with access to the Service functionality;',
      '1.1.2. The Users obligation to provide accurate data;',
      '1.1.3. Maintaining confidentiality of information posted on the Service.',
      '1.2. Key areas of cooperation include:',
      '1.2.1. Proper use of the Service capabilities in accordance with its intended purpose;',
      '1.2.2. Participation in improving the platform by providing feedback.'
    ]
  },
  {
    title: '2. PAYMENT TERMS',
    isPrimaryTitle: true,
    paragraphs: [
      '2.1. Access to the basic functionality of the Service is provided free of charge.',
      '2.2. Advanced functionality is available via subscription with monthly or annual payment:',
      '2.2.1. The monthly subscription cost is 5,000 (five thousand) rubles;',
      '2.2.2. The annual subscription cost is 50,000 (fifty thousand) rubles (16.6% savings).',
      '2.3. Payment is made:',
      '2.3.1. For legal entities — via bank transfer based on an invoice;',
      '2.3.2. For individuals — by bank card through a payment gateway.',
      // eslint-disable-next-line max-len
      '2.4. Automatic subscription renewal is performed unless the User disables this feature at least 3 days before the end of the current period.'
    ]
  },
  {
    title: '3. TERM AND TERMINATION PROCEDURE',
    isPrimaryTitle: true,
    paragraphs: [
      '3.1. The Agreement comes into force from the moment of:',
      '3.1.1. For unregistered users — first use of the Service;',
      '3.1.2. For registered users — acceptance of terms during registration.',
      '3.2. Term:',
      '3.2.1. Indefinitely — for basic functionality;',
      '3.2.2. For the duration of the paid subscription — for premium services.',
      '3.3. Termination:',
      // eslint-disable-next-line max-len
      '3.3.1. The User may cancel services in their personal account (for paid plans — at least 7 days before the end of the period);',
      // eslint-disable-next-line max-len
      '3.3.2. The Administration may terminate the Agreement unilaterally in case of violations under clauses 1.1.2–1.1.3.',
      '3.4. Upon termination, any remaining balance for the unused period of the paid subscription is non-refundable.'
    ]
  },
  {
    title: '4. LIABILITY OF THE PARTIES',
    isPrimaryTitle: true,
    paragraphs: [
      '4.1. The Administration is not liable for:',
      '4.1.1. Losses caused by the Users inaccurate data;',
      '4.1.2. Service disruptions due to actions of third parties or force majeure circumstances.',
      '4.2. The User shall compensate for damages in case of:',
      '4.2.1. Breach of confidentiality of other users data;',
      '4.2.2. Use of the Service for unlawful activities.'
    ]
  }
];

export const COMPANY_CATEGORY: Option<CompanyType | string>[] = [
  {
    label: 'Не выбрано',
    value: '',
    isDisabled: true
  },
  {
    label: 'Поставщик',
    value: '0'
  },
  {
    label: 'Изготовитель',
    value: '1'
  },
  {
    label: 'Изготовитель и Поставщик',
    value: '2'
  }
];

export const COMPANY_CATEGORY_EN: Option<CompanyType | string>[] = [
  {
    label: 'none',
    value: '',
    isDisabled: true
  },
  {
    label: 'Supplier',
    value: '0'
  },
  {
    label: 'Manufacturer',
    value: '1'
  },
  {
    label: 'Manufacturer and Supplier',
    value: '2'
  }
];

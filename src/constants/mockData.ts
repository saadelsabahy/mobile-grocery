export const CATEGORIES_ARRAY: {name: string; image: string}[] = [
  {
    name: 'discover&bags',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwc0vQN_qS5Y3-9UTJ0i9EBpuvydikgWA-FA&usqp=CAU',
  },
  {
    name: 'discover',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwc0vQN_qS5Y3-9UTJ0i9EBpuvydikgWA-FA&usqp=CAU',
  },
  {
    name: 'discover',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwc0vQN_qS5Y3-9UTJ0i9EBpuvydikgWA-FA&usqp=CAU',
  },
  {
    name: 'discover',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwc0vQN_qS5Y3-9UTJ0i9EBpuvydikgWA-FA&usqp=CAU',
  },
  {
    name: 'discover',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwc0vQN_qS5Y3-9UTJ0i9EBpuvydikgWA-FA&usqp=CAU',
  },
  {
    name: 'discover',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwc0vQN_qS5Y3-9UTJ0i9EBpuvydikgWA-FA&usqp=CAU',
  },
  {
    name: 'discover',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwc0vQN_qS5Y3-9UTJ0i9EBpuvydikgWA-FA&usqp=CAU',
  },
  {
    name: 'discover',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwc0vQN_qS5Y3-9UTJ0i9EBpuvydikgWA-FA&usqp=CAU',
  },
  {
    name: 'discover',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwc0vQN_qS5Y3-9UTJ0i9EBpuvydikgWA-FA&usqp=CAU',
  },
  {
    name: 'discover',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwc0vQN_qS5Y3-9UTJ0i9EBpuvydikgWA-FA&usqp=CAU',
  },
  {
    name: 'discover',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwc0vQN_qS5Y3-9UTJ0i9EBpuvydikgWA-FA&usqp=CAU',
  },
];

export const SORT_OPTIONS = [
  {name: 'best seller', sort_criteria: 'qty_in_orders', sort_order: 'DESC'},
  {name: 'price increasing', sort_criteria: 'price', sort_order: 'DESC'},
  {name: 'price decreasing', sort_criteria: 'price', sort_order: 'ASC'},
  {name: 'the newest', sort_criteria: 'date_added', sort_order: 'DESC'},
  {name: 'number of comments', sort_criteria: 'reviews', sort_order: 'DESC'},
  {name: 'product score', sort_criteria: 'rating', sort_order: 'DESC'},
];

export const FIELDS = [
  {
    name: 'name',
    required: true,
    placeholder: 'Name',
    order: 1,
  },
  {
    name: 'telephone',
    required: false,
    placeholder: 'Telephone',
    value: '',
    order: 4,
  },
  {
    name: 'dob',
    required: true,
    placeholder: 'Birthday',
    value: '',
    order: 12,
  },
  {
    name: 'gender',
    required: true,
    placeholder: 'Gender',
    value: '',
    order: 13,
  },
  {
    name: 'customer_group_id',
    required: false,
    placeholder: 'Business Type:',
    values: [
      {
        customer_group_id: '2',
        approval: '0',
        customer_verified: '0',
        email_activation: '0',
        sms_activation: '0',
        company_id_display: '0',
        company_id_required: '0',
        tax_id_display: '0',
        tax_id_required: '0',
        sort_order: '0',
        language_id: '1',
        name: 'New Group',
        description: '',
      },
      {
        customer_group_id: '1',
        approval: '0',
        customer_verified: '0',
        email_activation: '0',
        sms_activation: '0',
        company_id_display: '0',
        company_id_required: '0',
        tax_id_display: '0',
        tax_id_required: '0',
        sort_order: '1',
        language_id: '1',
        name: 'Default',
        description: '',
      },
    ],
    value: '2',
    order: 16,
  },
  {
    name: 'newsletter',
    required: false,
    placeholder: 'Subscribe to newsletter:',
    value: '',
    order: 17,
  },
  {
    name: 'terms',
    required: true,
    placeholder: 'I have read and agree to store privacy',
    value: 0,
    order: 100,
  },
];

const lngTaxes = {
  'en.taxes': {
    'title.list': 'Units of Measurement',
    'title.create': 'New Unit',
    'title.edit': 'Edit Unit',
    'title.description':
      'System and custom measurement units for automated write-offs, warehouse inventory, and clinical tracking.',
    'title.total': 'Total',

    // Form & Table fields
    create: 'Create Unit',
    name: 'Full Name',
    short_name: 'Abbreviation',
    code: 'ISO / Tax Code',
    classification: {
      piece: 'Pieces & Packaging',
      volume: 'Volume & Liquids',
      weight: 'Mass & Weight',
    },

    // Actions & Common
    actions: 'Actions',
    save: 'Save',
    update: 'Update',
    saved: 'Saved.',
    cancel: 'Cancel',
    back: 'Back',
  },

  'uk.taxes': {
    'title.list': 'Ставки податку',
    'title.create': 'Нова ставка податку',
    'title.edit': 'Редагувати ставку податку',
    'title.description':
      'Керування податковими ставками, зборами та налаштуваннями фінансових відрахувань.',
    'title.total': 'загалом',

    // Form & Table fields
    create: 'Створити ставку',
    name: 'Повна назва',
    short_name: 'Скорочення',
    rate: 'Ставка %',
    classification: {
      piece: 'Штучні вироби',
      volume: "Об'єм та розчини",
      weight: 'Маса та вага',
    },

    // Actions & Common
    actions: 'Дії',
    save: 'Зберегти',
    update: 'Оновити',
    saved: 'Збережено.',
    cancel: 'Скасувати',
    back: 'Повернутися',
  },
};

export default lngTaxes;

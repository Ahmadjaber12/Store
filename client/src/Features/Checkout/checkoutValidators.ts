import * as yup from 'yup'
export const validationSchema=[yup.object({
    fullName:yup.string().required('Full name is requiered'),
    address1:yup.string().required('address line 1 is requiered'),
    address2:yup.string().required(),
    city:yup.string().required(),
    zip:yup.string().required(),
    state:yup.string().required(),
    country:yup.string().required(),

}),
    yup.object(),
    yup.object({
        cardName:yup.string().required()
    })
]
import { Formik } from 'formik'
import moment from 'moment-timezone'
import { useEffect, useState } from 'react'
import { Form } from "react-bootstrap"
import * as yup from "yup"
import FormTextArea from '../../components/FormTextArea'
import FormTextInput from '../../components/FormTextInput'
import "./PollsPage.css"


const schema = yup.object().shape({
    organizerName: yup.string().required("Field required").min(3, "Should be at least 3 characters"),
    organizerEmail: yup.string().nullable().optional(),
    name: yup.string().required("Field required").min(3, "Should be at least 3 characters"),
    details: yup.string().nullable().optional(),
})

const PollsPage = () => {
    const [name, setName] = useState('')
    const [values, setValues] = useState([])
    const [organizerName, setOrganizerName] = useState('')
    const [organizerEmail, setOrganizerEmail] = useState('')
    const [deadline, setDeadline] = useState(moment("2030-07-30 12:00"))
    const [details, setDetails] = useState('')
    const [selectedDates, setSelectedDates] = useState([])
    const [options, setOptions] = useState([])
    const [responses, setResponses] = useState([])
    const [step, setStep] = useState(0)

    // const [page, setPage] = useState(-1)
    // let pages = []

    // useEffect(() => {
    //     pages.push(initPage)
    //     setPage(0)
    // }, [])

    const handleStepOneSubmit = (values) => {
        setStepOneFieldsDisabledStatus(true)
        setOrganizerName(values.organizerName)
        setOrganizerEmail(values.organizerEmail)
        setName(values.name)
        setDetails(values.details)
        setStep(1)

        fadeIn(document.getElementById('polls-s1'))
    }

    const setStepOneFieldsDisabledStatus = (status) => {
        const formInputEl = document.querySelectorAll('#polls-s0 input')
        const formTextAreaEl = document.querySelectorAll('#polls-s0 textarea')
        formInputEl.forEach(el => el.disabled = status)
        formTextAreaEl.forEach(el => el.disabled = status)
    }

    const fadeIn = (element) => {
        let op = 0.1  // initial opacity
        element.style.display = 'block';

        // Only fade in element if it has opacity of 0
        if (!element.style.opacity) {
            const timer = setInterval(function () {
                if (op >= 1) {
                    clearInterval(timer);
                }
                element.style.opacity = op;
                element.style.filter = 'alpha(opacity=' + op * 100 + ")";
                op += op * 0.1;
            }, 15)
        }
    }

    const step0 = (
        <Formik
            initialValues={{
                organizerName: "",
                organizerEmail: "",
                name: "",
                details: "",
            }}

            onSubmit={values => handleStepOneSubmit(values)}
            validationSchema={schema}
            validateOnChange={true}
            validateOnBlur={false}

        >
            {({ handleSubmit, setFieldValue, values, touched, errors }) => (
                <>
                    <Form noValidate onSubmit={handleSubmit}>
                        <div id='polls-s0'>
                            <FormTextInput
                                label=""
                                name="organizerName"
                                type="text"
                                placeholder="What should your pollers call you?"
                                aria-label="organizer name"
                            />
                            <br />
                            <FormTextInput
                                label=""
                                name="organizerEmail"
                                type="email"
                                placeholder="Email (optional)"
                                aria-label="organizer email - is optional"
                            />
                            <br />
                            <FormTextInput
                                label=""
                                name="name"
                                type="text"
                                placeholder="Name of Your Poll"
                                aria-label="name of poll"
                            />
                            <br />
                            <FormTextArea
                                name="details"
                                rows="3"
                                placeholder="Feel free to desribe the event here for your pollers!"
                                aria-label="poll description"
                            />
                            {step === 0 ?
                                <div className='poll-btn-group'>
                                    <button type="submit" className='poll-btn btn-anim-1'> Save </button>
                                </div>
                                : null}
                        </div>
                    </Form>

                    {step === 0 ? null :
                        <div className='poll-btn-group'>
                            <button type="submit" onClick={() => {
                                setStep(0)
                                setStepOneFieldsDisabledStatus(false)
                            }} className='poll-btn btn-anim-1'> Edit </button>
                        </div>}

                </>
            )}
        </Formik>)

    const step1 = (
        <div id='polls-s1'>
            <h2>Select Dates</h2>
            {/* TODO:
                - Allow user to enter single date or date range
                - Show selected datas below input fields
                - Allow user to delete selected dates 
                - Prevent certain actions (i.e. date is before today or invalid range)
            */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div id='polls-s1-input-group' style={{ display: 'flex', justifyContent: 'center', marginBottom: '2px' }}>
                    <input id='polls-s1-input-field1' type='date' />
                    <p style={{ marginInline: '5px' }}> __ </p>
                    <input id='polls-s1-input-field2' type='date' />
                </div>
                <small style={{marginTop: '3px'}} className='error'>Must be the same</small>
                <button style={{ width: 'fit-content', alignSelf: 'center', marginTop: '10px'}}>Add Date</button>
                
            </div>
            <div className='poll-btn-group'>
                {step === 1 ?
                    <button onClick={() => setStep(1)} className='poll-btn btn-anim-1'> Save </button>
                    :
                    <button onClick={() => setStep(2)} className='poll-btn btn-anim-1'> Edit </button>
                }
            </div>
        </div>
    )

    const step2 = (
        <div id='polls-s2'>
            <h2>Select Times</h2>
            {/* TODO: add titles & logic */}
            <div className='poll-btn-group'>
                {step === 1 ?
                    <button onClick={() => setStep(2)} className='poll-btn btn-anim-1'> Save </button>
                    :
                    <button onClick={() => setStep(3)} className='poll-btn btn-anim-1'> Edit </button>
                }
            </div>
        </div>
    )

    const step3 = (
        <div id='polls-s3'>
            <h2>Confirm</h2>
            {/* TODO: confirm all given information */}
            {/* TODO: 
                - Detect if user is already logged in
                - If logged in, allow user to set a deadline
                - If not logged in, allow user to create account and reroute them here with all previous information saved 
                   (likely will have to use Session Storage)
            */}
            <small>Would you like to add a deadline? Join Kalen. today for free to do so!</small>
            <div className='poll-btn-group'>
                {step === 1 ?
                    <button onClick={() => setStep(2)} className='poll-btn btn-anim-1'> Save </button>
                    :
                    <button onClick={() => setStep(3)} className='poll-btn btn-anim-1'> Edit </button>
                }
            </div>
        </div>
    )


    return (
        <div id="main-container">
            <h1>Welcome to Quick and Easy Group Polls</h1>
            <p>never been easier to find the best time to do <i>anything</i></p>
            <br />
            {step0}
            {step1}
        </div>
    )
}

export default PollsPage

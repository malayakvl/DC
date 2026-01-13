import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../hooks';
import { appLangSelector } from '../../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngPatient from '../../../Lang/Patient/translation';
import lngAct from '../../../Lang/Act/translation';
import InputText from '../../../Components/Form/InputText';
import InputCalendar from '../../../Components/Form/InputCalendar';
import { Link, useForm } from '@inertiajs/react';
import { actItemsSelector, actFiltersSelector, actClearFiltersSelector } from '../../../Redux/Act/selectors';
import { setFilters, clearFilters } from '../../../Redux/Act';

export default function Filters() {
    const appLang = useSelector(appLangSelector);
    const isClear = useSelector(actClearFiltersSelector);
    const ref = React.useRef(null);
    const dispatch = useAppDispatch();
    const filtersData = useSelector(actFiltersSelector);
    const { data, setData, post } =
        useForm(filtersData);
    const msg = new Lang({
        messages: { ...lngPatient, ...lngAct },
        locale: appLang,
    });

    const handleChange = e => {
        const key = e.target.id;
        const value = e.target.value;
        setData(values => ({
            ...values,
            [key]: value,
        }));
        filtersData[key] = value;
        dispatch(setFilters(filtersData));
    };

    const handleDateChange = (date, key) => {
        setData(values => ({
            ...values,
            [key]: date,
        }));
        filtersData[key] = date;
        dispatch(setFilters(filtersData));
    };

    const search = () => {
        post(route('act.index'));
    }

    const searchClear = () => {
        dispatch(clearFilters());
        setData(values => ({
            filterName: '',
            filterAmount: '',
            filterDateFrom: '',
            filterDateTo: '',
        }));
        ref.current.reset();
    }

    useEffect(() => {
        if (isClear) {
            post(route('act.index'));
        }
    }, [isClear])


    return (
        <form ref={ref} className={'w-full'}>
            <div className="mt-4 flex flex-wrap justify-end items-end gap-x-4">

                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="inline-label">
                            {msg.get('patient.last.name')}
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <InputText
                            name={'filterName'}
                            values={data}
                            className={'input-text-noborder f-24'}
                            onChange={handleChange}
                            showLabel={false}
                            label={msg.get('patient.last.name')}
                        />
                    </div>
                </div>

                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3 text-right pr-2">
                        <label className="inline-label">
                            {msg.get('act.date')}
                        </label>
                    </div>
                    <div className="md:w-2/3 flex gap-2">
                        <InputCalendar
                            name={'filterDateFrom'}
                            values={data}
                            className={'input-text-noborder f-24'}
                            onChange={(date) => handleDateChange(date, 'filterDateFrom')}
                            label={''}
                        />
                        <InputCalendar
                            name={'filterDateTo'}
                            values={data}
                            className={'input-text-noborder f-24'}
                            onChange={(date) => handleDateChange(date, 'filterDateTo')}
                            label={''}
                        />
                    </div>
                </div>

                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="inline-label">
                            {msg.get('act.total')}
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <InputText
                            name={'filterAmount'}
                            values={data}
                            type="text"
                            className={'input-text-noborder f-24'}
                            onChange={handleChange}
                            showLabel={false}
                            label={msg.get('act.total')}
                        />
                    </div>
                </div>

                <div className="md:flex md:items-center mb-6 ml-3">
                    <span
                        className="btn-back cursor-pointer"
                        title={msg.get('patient.search')}
                        onClick={() => search()}
                    >
                        {msg.get('patient.search')}
                    </span>
                    <span
                        className="btn-back cursor-pointer"
                        onClick={() => {
                            searchClear();
                        }}
                        title={msg.get('patient.search.clear')}
                    >
                        {msg.get('patient.search.clear')}
                    </span>
                </div>
            </div>
        </form>
    );
}

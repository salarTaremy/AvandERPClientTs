
import React, { useEffect, useState } from 'react'
import { PropTypes } from 'prop-types'
import * as Ant from 'antd'
import * as url from '@/api/url'
import * as styles from '@/styles'
import * as api from '@/api'
import useRequestManager from '@/hooks/useRequestManager'
import useAllLoading from '@/hooks/useAllLoading '
//====================================================================
//                        Declaration
//====================================================================
const CitySelector = (props) => {
    const { id } = props
    const pageTitle = 'شرح صفحه'
    const [CityData, CityLoading, CityError, CityApiCall] = api.useFetchWithHandler()
    const [options, setOptions] = useState([])
      


    const [selectedItem, setSelectedItem] = useState({value:null})
    useRequestManager({ error: CityError })
    //...
    //====================================================================
    //                        useEffects
    //====================================================================

    useEffect(async () => {
        await CityApiCall(url.CITY_TREE)
    }, [])
    useEffect(() => {
        CityData?.isSuccess && setOptions(CityData?.data)
    }, [CityData])
    //====================================================================
    //                        Functions
    //====================================================================
    const onChange = (value, selectedOptions) => {
        setSelectedItem({ value })
    };
    const filter = (inputValue, path) =>
        path.some((option) => option.name.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
    //====================================================================
    //                        Child Components
    //====================================================================


    
    const CitySelector = () => {
        return (
            <>


                <Ant.Cascader
                    loading={CityLoading}
                    options={options}
                    onChange={onChange}
                    placeholder="لطفا انتخاب کنید ..."
                    fieldNames={{ label: 'name', value: 'id', children: 'children' }}
                    showSearch={{
                        filter,
                    }}
                    onSearch={(value) => console.log(value)}
                />
                <Ant.Divider></Ant.Divider>
                {JSON.stringify(selectedItem, null, 1, 1)}

            </>
        )
    }
    //====================================================================
    //                        Component
    //====================================================================
    return (
        <Ant.Card Card title={pageTitle} type="inner" style={{ ...styles.CARD_DEFAULT_STYLES }} loading={false}>
            <CitySelector />
        </Ant.Card>
    )
}

export default CitySelector
CitySelector.propTypes = {
    id: PropTypes.any,
}

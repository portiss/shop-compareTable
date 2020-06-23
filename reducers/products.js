import { getData } from '../app/api'

/* reducer init */
const initialState = {

    collection: [],
    dataTable: [
        {title: 'Artikelnummer', cols: [], diff: false},
        {title: 'badges', cols: [], diff: false},
        {title: 'Hardheid', cols: [], diff: false},
        {title: 'Inwendige diameter', cols: [], diff: false},
        {title: 'Kleur', cols: [], diff: false},
        {title: 'Maat volgens AS568', cols: [], diff: false},
        {title: 'Materiaal', cols: [], diff: false},
        {title: 'Snoerdikte', cols: [], diff: false},
        {title: 'stepQuantity', cols: [], diff: false},
        {title: 'Temperatuurgebied', cols: [], diff: false},
        {title: 'Toepassing', cols: [], diff: false},
    ],
}

/* Pure function reducer, return new state with updated data */
export default function productsReducer(state = initialState, action) {

    switch (action.type) {
        case 'LOAD_PRODUCTS':
            /* Copy the data from initialState */
            const dataTable = [...initialState.dataTable]

            /* Reset old values from each column array */
            dataTable.forEach(row => row.cols = [])

            /* Build dataTable with flatten array to each row (with: title, cold, isDiff) */
            action.result
                .filter(row => row.display)
                .forEach(row => {
                    dataTable.forEach(key => {
                        key.cols.push(row[key.title])
                        key.diff = !key.cols.every( v => v === key.cols[0] )
                    })
                })
            /* Return the new data into new state */
            return Object.assign({}, state, { collection: action.result, dataTable })
    }
    return state
}

/* When toggle trash button or checkbox */
export const toggleDisplayProduct = (productName) => async (dispatch, getState) => {

    const state = getState().products
    const productsCollection = Array.from(state.collection)
    productsCollection.forEach(element => {
        if (element.name === productName)
            element.display = !element.display
    });
    const result = productsCollection
    dispatch({
        type: 'LOAD_PRODUCTS',
        result,
    })
}

/* Action - load */
export const loadProducts = () => async dispatch => {

    const result = await getData()
    dispatch({
        type: 'LOAD_PRODUCTS',
        result,
    })
}

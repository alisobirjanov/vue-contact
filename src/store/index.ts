import { createStore } from 'vuex'

export interface IContact {
    full_name: string;
    phone: string;
    email: string;
    groups: string[];
}

interface State {
    contacts: IContact[]
}

const store = createStore<State>({
    state: {
        contacts: [
            {
                full_name: 'John Deo',
                phone: '+998991234567',
                email: 'john@gmail.com',
                groups: ['Не назначено']
            }
        ]
    },
    getters: {
        getContacts(state) {
            return state.contacts
        }
    },
    mutations: {
        addContact(state, payload) {
            state.contacts.unshift(payload)
        },
        deleteContact(state, index) {
            state.contacts.splice(index, 1)
        },
        editContact(state, payload) {
            state.contacts.splice(payload.idx, 1)
            state.contacts.unshift(payload.contact)
        }
    },
})


export default store
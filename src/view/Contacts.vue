<template>
  <div>
    <div class="row py-4">
      <div class="col-md-3">
        <input
          class="form-control"
          type="text"
          placeholder="Ф.И.О"
          v-model="filters.full_name"
          @input="onChange"
        />
      </div>
      <div class="col-md-3">
        <input
          class="form-control"
          type="text"
          placeholder="Номер телефон"
          v-model="filters.phone"
          @input="onChange"
        />
      </div>
      <div class="col-md-3">
        <input
          class="form-control"
          type="text"
          placeholder="Email"
          v-model="filters.email"
          @input="onChange"
        />
      </div>
      <div class="col-md-3">
        <select class="form-select" v-model="filters.groups" @input="onChange">
          <option value="Не назначено">Не назначено</option>
          <option value="Коллеги">Коллеги</option>
          <option value="Семья">Семья</option>
          <option value="Друзья">Друзья</option>
        </select>
      </div>
    </div>
    <ContactsTable :contacts="filteredContacts" />
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from "vue";
import { useStore } from "vuex";
// @ts-ignore: Unreachable code error
import ContactsTable from "../components/ContactsTable.vue";
import { IContact } from '../store'

const store = useStore();

const filters: Ref<any> = ref({
  full_name: "",
  phone: "",
  email: "",
  groups: "",
});

const filteredContacts: Ref<IContact> = ref(store.getters.getContacts);

let timer: any;

function onChange() {
  const { full_name, email, phone } = filters.value;
  clearTimeout(timer);
  timer = setTimeout(() => {
    filteredContacts.value = store.getters.getContacts.filter(
      (contact: IContact) => {
        let isValid: boolean = true;
        if (
          full_name.length &&
          !contact.full_name.match(new RegExp(full_name, "i"))
        ) {
          isValid = false;
        }
        if (phone.length && contact.phone.indexOf(phone) < 0) {
          isValid = false;
        }
        if (email.length && !contact.email.match(new RegExp(email, "i"))) {
          isValid = false;
        }
        if (
          filters.value.groups &&
          !contact.groups.includes(filters.value.groups)
        ) {
          isValid = false;
        }
        return isValid;
      }
    );
  }, 500);
}
</script>

<style scoped>
</style>
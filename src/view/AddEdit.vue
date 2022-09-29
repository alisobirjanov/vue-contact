<template>
  <div>
    <div class="row">
      <div class="col-4 offset-4">
        <input
          class="form-control mb-4"
          type="text"
          placeholder="Ф.И.О"
          v-model="contact.full_name"
        />
        <input
          class="form-control mb-4"
          type="text"
          placeholder="Номер телефон"
          v-model="contact.phone"
        />
        <input
          class="form-control mb-4"
          type="text"
          placeholder="Email"
          v-model="contact.email"
        />
        <select multiple class="form-select mb-4" v-model="contact.groups">
          <option value="Не назначено">Не назначено</option>
          <option value="Коллеги">Коллеги</option>
          <option value="Семья">Семья</option>
          <option value="Друзья">Друзья</option>
        </select>
        <div class="d-flex justify-content-end">
          <button class="btn btn-success" @click="onSubmit">Сохранить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, Ref } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { IContact } from '../store'

const store = useStore();
const router = useRouter();
const route = useRoute();

const contact: Ref<IContact> = ref({
  full_name: "",
  phone: "",
  email: "",
  groups: ['Не назначено'],
});

function onSubmit() {
  const idx: any = route.params.idx
  if(idx === 'create') {
    store.commit("addContact", contact.value);
  } else {
    store.commit("editContact", {
      idx,
      contact: contact.value
    });
  }
  router.push({ name: "contacts" });
}

onMounted(() => {
  const idx: any = route.params.idx
  if(idx !== 'create' && store.getters.getContacts[idx]) {
    contact.value = JSON.parse(JSON.stringify(store.getters.getContacts[idx]))
  }
})
</script>

<style scoped>
</style>
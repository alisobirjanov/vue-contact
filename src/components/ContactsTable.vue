<template>
  <div>
    <table class="table caption-top table-striped">
      <caption>
        Контакты
      </caption>
      <thead>
        <tr>
          <th scope="col">Ф.И.О</th>
          <th scope="col">Тел. номер</th>
          <th scope="col">E-mail</th>
          <th scope="col">Группы</th>
          <th scope="col">Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(contact, index) in props.contacts" :key="index">
          <td>{{ contact.full_name }}</td>
          <td>{{ contact.phone }}</td>
          <td>{{ contact.email }}</td>
          <td>{{ contact.groups.join(", ") }}</td>
          <td>
            <button
              class="btn btn-warning btn-sm"
              @click="$router.push({ name: 'create', params: { idx: index } })"
            >
              Редактировать
            </button>
            <button
              class="btn btn-danger btn-sm mx-2"
              @click="store.commit('deleteContact', index)"
            >
              Удалить
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <h4 class="text-center" v-if="!contacts.length">Не найден</h4>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { useStore } from "vuex";
import { IContact } from "../store";

const store = useStore();

const props = defineProps<{ contacts: IContact[] }>();
</script>

<style scoped>
</style>
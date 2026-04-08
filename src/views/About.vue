<template>
  <q-page padding>
    <div>
        <router-link :to="{ name: 'Kvar', params: { id: 'aaaaaaa' }}">קישור לכבר אחד</router-link>
        <br/>
        <router-link :to="{ name: 'Kvar', params: { id: 'יש שלום במזרח התיכון' }}">קישור לכבר שני</router-link>
    </div>
  </q-page>
</template>

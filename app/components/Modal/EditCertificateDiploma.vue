<template>
  <BaseModal id="modal_edit_certificate_diploma">
    <div class="flex flex-col items-center gap-8">
      <div>
        <p class="text-xl text-center text-secondary-100 font-semibold">Edit Certificate/Degree</p>
        <h2 class="text-3xl font-bold">Showcase your certificates</h2>
        <p class="text-center text-secondary-90 text-sm">
          Upload a Hygiene Certificate and earn a badge on your profile
        </p>
      </div>
      <div class="space-y-4 w-full" v-for="(cert, index) in certificates" :key="index">
        <InputOutline placeholder="Certificate/Degree Title" type="text" />
        <InputOutline placeholder="Issued Year" type="text" />
        <InputOutline placeholder="Issued By" type="text" />
        <FileUpload />
      </div>
      <button type="button" class="btn border border-secondary-400 rounded-full flex-grow font-semibold w-full"
        @click="addCertificate">
        Add More
      </button>
      <div class="flex gap-6 w-full">
        <button type="button" class="btn border border-primary-yellow rounded-full flex-grow font-semibold">
          Back
        </button>
        <button type="submit" class="btn bg-primary-yellow text-black rounded-full flex-grow font-semibold border-0">
          Submit
        </button>
      </div>
    </div>
  </BaseModal>
</template>

<script setup>
import FileUpload from '../FileUpload.vue';

const certificates = ref([
  { title: "", year: "", issuedBy: "", file: null }
])

function addCertificate() {
  certificates.value.push({ title: "", year: "", issuedBy: "", file: null })
}

function removeCertificate(index) {
  certificates.value.splice(index, 1)
}
</script>
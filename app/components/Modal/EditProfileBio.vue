<template>
  <BaseModal id="modal_edit_profile_bio">
    <div class="flex flex-col items-center gap-8">
      <div>
        <p class="text-xl text-center text-secondary-100 font-semibold">Edit Profile Bio</p>
        <h2 class="text-3xl font-bold">A few words about you</h2>
      </div>
      <InputOutline placeholder="Write a few words describing yourself" type="textarea" />
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
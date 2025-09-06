<template>
    <nav class="navbar py-8 px-8 flex flex-col">
      <section class="relative flex flex-row justify-between w-full items-center">
          <div class="navbar-branding-start w-40">
                <NuxtLink to="/">
                    <img src="/assets/images/logo_light.png" alt="Logo">
                </NuxtLink>
            </div>
          <div class="navbar-navigation gap-8 flex flex-row font-bold absolute left-1/2 transform -translate-x-1/2">
                <NuxtLink class="text-sm" to="/">Price Calculator</NuxtLink>
                <NuxtLink class="text-sm" to="/">Artist Finder</NuxtLink>
                <NuxtLink class="text-sm" to="/">Style Guide</NuxtLink>
            </div>
            <div class="navbar-action-end">
                <div>
                    <div class="buttons gap-8 flex items-center">
                        <NuxtLink class="button is-primary text-sm" to="/">
                            <strong>Register as Artist</strong>
                        </NuxtLink>
                        <NuxtLink class="button bg-hero text-black px-4 py-2 rounded-full text-sm" to="/login">
                            Log in / Register
                        </NuxtLink>
                    </div>
                </div>
            </div>
       </section>
       <section>
        <NavbarFields/>
       </section>
    </nav>
</template>
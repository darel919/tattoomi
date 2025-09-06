<template>
    <nav class="navbar py-8 px-8 flex flex-col">
      <section class="relative flex flex-row justify-between w-full items-center">
          <div class="navbar-branding-start w-40">
                <a href="/">
                    <img src="/assets/images/logo_light.png" alt="Logo">
                </a>
            </div>
          <div class="navbar-navigation gap-8 flex flex-row font-bold absolute left-1/2 transform -translate-x-1/2">
                <a class="text-sm" href="/">Price Calculator</a>
                <a class="text-sm" href="/">Artist Finder</a>
                <a class="text-sm" href="/">Style Guide</a>
            </div>
            <div class="navbar-action-end">
                <div>
                    <div class="buttons gap-8 flex items-center">
                        <a class="button is-primary text-sm" href="/">
                            <strong>Register as Artist</strong>
                        </a>
                        <a class="button bg-hero text-black px-4 py-2 rounded-full text-sm" href="/login">
                            Log in / Register
                        </a>
                    </div>
                </div>
            </div>
       </section>
       <section>
        <NavbarFields/>
       </section>
    </nav>
</template>
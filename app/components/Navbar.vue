<template>
    <nav class="navbar p-8">
       <section class="flex flex-row justify-between w-full items-center">
            <div class="navbar-branding-start">
                <a class="navbar-item" href="/">
                    <img src="/assets/images/logo_light.png" alt="Logo">
                </a>
            </div>
            <div class="navbar-navigation gap-8 flex flex-row font-bold">
                <a class="navbar-item" href="/">Price Calculator</a>
                <a class="navbar-item" href="/">Artist Finder</a>
                <a class="navbar-item" href="/">Style Guide</a>
            </div>
            <div class="navbar-action-end">
                <div class="navbar-item">
                    <div class="buttons gap-8 flex items-center">
                        <a class="button is-primary" href="/">
                            <strong>Register as Artist</strong>
                        </a>
                        <a class="button bg-hero text-black px-4 py-2 rounded-full" href="/login">
                            Log in / Register
                        </a>
                    </div>
                </div>
            </div>
       </section>
    </nav>
</template>
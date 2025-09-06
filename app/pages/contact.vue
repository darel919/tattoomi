<template>
    <section class="py-12">
        <div class="container mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div>
                    <h1>Contact Us</h1>
                    <p>We are here for you to help you with any concerns, every question and feedback. We look forward to hearing from you.</p>
                    <p>
                        Tattoomii GmbH c/o Florian van Dusseldorp<br>
                        Badenerstrasse 541<br>
                        8048 Zurich, Switzerland<br>
                    </p>
                    <p>E-Mail: <a href="mailto:info@tattoomii.com" class="text-blue-600">info@tattoomii.com</a></p>
                    <p>Phone: <a href="tel:0792817783" class="text-blue-600">079 281 77 83</a></p>
                </div>

                <aside>
                    <h2 class="text-2xl font-semibold mb-4">Reach out to us</h2>
                    <form class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium mb-1" for="name">Your Name</label>
                            <div class="relative">
                                <input id="name" type="text" placeholder="Enter your full name" class="input input-bordered w-full pl-10" />
                                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                    </svg>
                                </span>
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-medium mb-1" for="email">Your Email</label>
                            <div class="relative">
                                <input id="email" type="email" placeholder="Enter your email address" class="input input-bordered w-full pl-10" />
                                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                    </svg>
                                </span>
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-medium mb-1" for="message">Message</label>
                            <textarea id="message" placeholder="Write your message here..." class="textarea textarea-bordered w-full h-28 resize-none"></textarea>
                        </div>

                        <div>
                            <button type="submit" class="btn btn-warning">Send Message</button>
                        </div>
                    </form>
                </aside>
            </div>
        </div>
    </section>
</template>
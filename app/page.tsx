import Image from "next/image";

export default function Home() {
  return (
    <div>
      Ini halaman home
    </div>
  )
  // return (
  //   // <main classNameName="flex min-h-screen flex-col items-center justify-between p-24">
  //   //   <div classNameName="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
  //   //     <p classNameName="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
  //   //       Get started by editing&nbsp;
  //   //       <code classNameName="font-mono font-bold">app/page.tsx</code>
  //   //     </p>
  //   //     <div classNameName="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
  //   //       <a
  //   //         classNameName="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
  //   //         href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
  //   //         target="_blank"
  //   //         rel="noopener noreferrer"
  //   //       >
  //   //         By{" "}
  //   //         <Image
  //   //           src="/vercel.svg"
  //   //           alt="Vercel Logo"
  //   //           classNameName="dark:invert"
  //   //           width={100}
  //   //           height={24}
  //   //           priority
  //   //         />
  //   //       </a>
  //   //     </div>
  //   //   </div>

  //   //   <div classNameName="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
  //   //     <Image
  //   //       classNameName="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
  //   //       src="/next.svg"
  //   //       alt="Next.js Logo"
  //   //       width={180}
  //   //       height={37}
  //   //       priority
  //   //     />
  //   //   </div>

  //   //   <div classNameName="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
  //   //     <a
  //   //       href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
  //   //       classNameName="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
  //   //       target="_blank"
  //   //       rel="noopener noreferrer"
  //   //     >
  //   //       <h2 classNameName="mb-3 text-2xl font-semibold">
  //   //         Docs{" "}
  //   //         <span classNameName="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
  //   //           -&gt;
  //   //         </span>
  //   //       </h2>
  //   //       <p classNameName="m-0 max-w-[30ch] text-sm opacity-50">
  //   //         Find in-depth information about Next.js features and API.
  //   //       </p>
  //   //     </a>

  //   //     <a
  //   //       href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
  //   //       classNameName="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
  //   //       target="_blank"
  //   //       rel="noopener noreferrer"
  //   //     >
  //   //       <h2 classNameName="mb-3 text-2xl font-semibold">
  //   //         Learn{" "}
  //   //         <span classNameName="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
  //   //           -&gt;
  //   //         </span>
  //   //       </h2>
  //   //       <p classNameName="m-0 max-w-[30ch] text-sm opacity-50">
  //   //         Learn about Next.js in an interactive course with&nbsp;quizzes!
  //   //       </p>
  //   //     </a>

  //   //     <a
  //   //       href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
  //   //       classNameName="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
  //   //       target="_blank"
  //   //       rel="noopener noreferrer"
  //   //     >
  //   //       <h2 classNameName="mb-3 text-2xl font-semibold">
  //   //         Templates{" "}
  //   //         <span classNameName="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
  //   //           -&gt;
  //   //         </span>
  //   //       </h2>
  //   //       <p classNameName="m-0 max-w-[30ch] text-sm opacity-50">
  //   //         Explore starter templates for Next.js.
  //   //       </p>
  //   //     </a>

  //   //     <a
  //   //       href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
  //   //       classNameName="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
  //   //       target="_blank"
  //   //       rel="noopener noreferrer"
  //   //     >
  //   //       <h2 classNameName="mb-3 text-2xl font-semibold">
  //   //         Deploy{" "}
  //   //         <span classNameName="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
  //   //           -&gt;
  //   //         </span>
  //   //       </h2>
  //   //       <p classNameName="m-0 max-w-[30ch] text-balance text-sm opacity-50">
  //   //         Instantly deploy your Next.js site to a shareable URL with Vercel.
  //   //       </p>
  //   //     </a>
  //   //   </div>
  //   // </main>
  //   <main>
  //     {/* About Us Area Start */}
  //     <section id="about" className="mb-16 md:mb-0">
  //       <div className="container__main">
  //         <div className="grid grid-cols-1 md:grid-cols-2 items-center">
  //           <div>
  //             <img src="./assets/img/hero.jpg" alt="Hero" />
  //           </div>
  //           <div>
  //             <h1 className="text-3xl font-semibold text-gray-800">
  //               Best
  //               <span className="text-sky-600">Software Development</span> Company For
  //               Next Generation.
  //             </h1>
  //             <p className="text-gray-600 my-5">
  //               Lorem ipsum, dolor sit amet consectetur adipisicing elit.
  //               Veritatis voluptatibus optio repudiandae assumenda doloremque.
  //             </p>
  //             <button className="rounded__btn rounded-3xl">Get Started</button>
  //           </div>
  //         </div>
  //       </div>
  //     </section>
  //     {/* <!-- About Us Area End --> */}

  //     {/* <!-- Activity Area Start --> */}
  //     <section className="mb-16">
  //       <div className="container__main">
  //         <div className="text-center mb-12">
  //           <h3 className="text-sky-500 font-semibold text-2xl">Why choose us?</h3>
  //           <p className="text-gray-600 mt-1">
  //             Products and components delivered to your home
  //           </p>
  //         </div>

  //         <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
  //           <article className="card__hover__bg">
  //             <i className="fa-solid fa-truck-fast text-5xl text-sky-500"></i>
  //             <h3 className="text-xl font-semibold text-gray-800 my-4">
  //               Free shipping
  //             </h3>
  //             <p className="text-sm text-gray-600">
  //               Enjoy Order in a hand using the fresness of groceries.
  //             </p>
  //           </article>

  //           <article className="card__hover__bg">
  //             <i
  //               className="fa-solid fa-hand-holding-dollar text-5xl text-sky-500"
  //             ></i>
  //             <h3 className="text-xl font-semibold text-gray-800 my-4">
  //               15 days returns
  //             </h3>
  //             <p className="text-sm text-gray-600">
  //               Order in a handy way using the freshness of the groceries.
  //             </p>
  //           </article>

  //           <article className="card__hover__bg">
  //             <i className="fa-solid fa-building-lock text-5xl text-sky-500"></i>
  //             <h3 className="text-xl font-semibold text-gray-800 my-4">
  //               Secure checkout
  //             </h3>
  //             <p className="text-sm text-gray-600">
  //               If you get rotten items - return immediately to us.
  //             </p>
  //           </article>
  //         </div>
  //       </div>
  //     </section>
  //     {/* <!-- Activity Area End --> */}

  //     {/* <!-- Service Area Start --> */}
  //     <section id="services" className="py-16 bg-gray-50">
  //       <div className="container__main">
  //         <div className="text-center mb-12">
  //           <h3 className="text-sky-500 font-semibold text-2xl">
  //             What do we provide?
  //           </h3>
  //           <p className="text-gray-600 mt-1">
  //             Products and components delivered to your home
  //           </p>
  //         </div>

  //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-7">
  //           <article className="mx-auto service__card">
  //             <div className="h-72 overflow-hidden">
  //               <img
  //                 src="./assets/img/services/service-1.jpg"
  //                 alt="Nesciunt Mete"
  //                 className="h-full w-full rounded-lg transition-transform duration-300 object-cover"
  //               />
  //             </div>
  //             <div
  //               className="w-10/12 mx-auto rounded-lg bg-white opacity-90 shadow-md text-center px-5 pb-8 z-10 relative -top-24 -mb-16"
  //             >
  //               <div
  //                 className="w-20 h-20 flex justify-center items-center text-center rounded-full transition-colors duration-300 bg-sky-500 border-[6px] border-white text-white mx-auto relative -top-10 service__icon"
  //               >
  //                 <i className="fa-solid fa-chart-line text-2xl inline-block"></i>
  //               </div>
  //               <h3 className="text-xl font-semibold text-gray-800 -mt-4 mb-4">
  //                 Nesciunt Mete
  //               </h3>
  //               <p className="text-gray-600">
  //                 Provident nihil minus qui consequatur non omnis maiores. Eos
  //                 accusantium minus dolores iure perferendis.
  //               </p>
  //             </div>
  //           </article>

  //           <article className="mx-auto service__card">
  //             <div className="h-72 overflow-hidden">
  //               <img
  //                 src="./assets/img/services/service-2.jpg"
  //                 alt="Eosle Commodi"
  //                 className="h-full w-full rounded-lg transition-transform duration-300 object-cover"
  //               />
  //             </div>
  //             <div
  //               className="w-10/12 mx-auto rounded-lg bg-white opacity-90 shadow-md text-center px-5 pb-8 z-10 relative -top-24 -mb-16"
  //             >
  //               <div
  //                 className="w-20 h-20 flex justify-center items-center text-center rounded-full transition-colors duration-300 bg-sky-500 text-white border-[6px] border-white mx-auto relative -top-10 service__icon"
  //               >
  //                 <i
  //                   className="fa-solid fa-tower-broadcast text-2xl inline-block"
  //                 ></i>
  //               </div>
  //               <h3 className="text-xl font-semibold text-gray-800 -mt-4 mb-4">
  //                 Eosle Commodi
  //               </h3>
  //               <p className="text-gray-600">
  //                 Ut autem aut autem non a. Sint sint sit facilis nam iusto sint.
  //                 Libero corrupti neque eum hic non ut nesciunt dolorem.
  //               </p>
  //             </div>
  //           </article>

  //           <article className="mx-auto service__card">
  //             <div className="h-72 overflow-hidden">
  //               <img
  //                 src="./assets/img/services/service-3.jpg"
  //                 alt="Ledo Markt"
  //                 className="h-full w-full rounded-lg transition-transform duration-300 object-cover"
  //               />
  //             </div>
  //             <div
  //               className="w-10/12 mx-auto rounded-lg bg-white opacity-90 shadow-md text-center px-5 pb-8 z-10 relative -top-24 -mb-16"
  //             >
  //               <div
  //                 className="w-20 h-20 flex justify-center items-center text-center rounded-full transition-colors duration-300 bg-sky-500 text-white border-[6px] border-white mx-auto relative -top-10 service__icon"
  //               >
  //                 <i className="fa-solid fa-disease text-2xl inline-block"></i>
  //               </div>
  //               <h3 className="text-xl font-semibold text-gray-800 -mt-4 mb-4">
  //                 Ledo Markt
  //               </h3>
  //               <p className="text-gray-600">
  //                 Ut excepturi voluptatem nisi sed. Quidem fuga consequatur. Minus
  //                 ea aut. Vel qui id voluptas adipisci eos earum corrupti.
  //               </p>
  //             </div>
  //           </article>

  //           <article className="mx-auto service__card">
  //             <div className="h-72 overflow-hidden">
  //               <img
  //                 src="./assets/img/services/service-4.jpg"
  //                 alt="Asperiores Commodit"
  //                 className="h-full w-full rounded-lg transition-transform duration-300 object-cover"
  //               />
  //             </div>
  //             <div
  //               className="w-10/12 mx-auto rounded-lg bg-white opacity-90 shadow-md text-center px-5 pb-8 z-10 relative -top-24 -mb-16"
  //             >
  //               <div
  //                 className="w-20 h-20 flex justify-center items-center text-center rounded-full transition-colors duration-300 bg-sky-500 text-white border-[6px] border-white mx-auto relative -top-10 service__icon"
  //               >
  //                 <i className="fa-solid fa-box text-2xl inline-block"></i>
  //               </div>
  //               <h3 className="text-xl font-semibold text-gray-800 -mt-4 mb-4">
  //                 Asperiores Commodit
  //               </h3>
  //               <p className="text-gray-600">
  //                 Non et temporibus minus omnis sed dolor esse consequatur.
  //                 Cupiditate sed error ea fuga sit provident adipisci neque.
  //               </p>
  //             </div>
  //           </article>

  //           <article className="mx-auto service__card">
  //             <div className="h-72 overflow-hidden">
  //               <img
  //                 src="./assets/img/services/service-5.jpg"
  //                 alt="Velit Doloremque"
  //                 className="h-full w-full rounded-lg transition-transform duration-300 object-cover"
  //               />
  //             </div>
  //             <div
  //               className="w-10/12 mx-auto rounded-lg bg-white opacity-90 shadow-md text-center px-5 pb-8 z-10 relative -top-24 -mb-16"
  //             >
  //               <div
  //                 className="w-20 h-20 flex justify-center items-center text-center rounded-full transition-colors duration-300 bg-sky-500 text-white border-[6px] border-white mx-auto relative -top-10 service__icon"
  //               >
  //                 <i className="fa-solid fa-calendar-days text-2xl inline-block"></i>
  //               </div>
  //               <h3 className="text-xl font-semibold text-gray-800 -mt-4 mb-4">
  //                 Velit Doloremque
  //               </h3>
  //               <p className="text-gray-600">
  //                 Cumque et suscipit saepe. Est maiores autem enim facilis ut aut
  //                 ipsam corporis aut. Sed animi at autem alias eius labore.
  //               </p>
  //             </div>
  //           </article>

  //           <article className="mx-auto service__card">
  //             <div className="h-72 overflow-hidden">
  //               <img
  //                 src="./assets/img/services/service-6.jpg"
  //                 alt="Dolori Architecto"
  //                 className="h-full w-full rounded-lg transition-transform duration-300 object-cover"
  //               />
  //             </div>
  //             <div
  //               className="w-10/12 mx-auto rounded-lg bg-white opacity-90 shadow-md text-center px-5 pb-8 z-10 relative -top-24 -mb-16"
  //             >
  //               <div
  //                 className="w-20 h-20 flex justify-center items-center text-center rounded-full transition-colors duration-300 bg-sky-500 text-white border-[6px] border-white mx-auto relative -top-10 service__icon"
  //               >
  //                 <i className="fa-regular fa-message text-2xl inline-block"></i>
  //               </div>
  //               <h3 className="text-xl font-semibold text-gray-800 -mt-4 mb-4">
  //                 Dolori Architecto
  //               </h3>
  //               <p className="text-gray-600">
  //                 Hic molestias ea quibusdam eos. Fugiat enim doloremque aut neque
  //                 non et debitis iure. Corrupti recusandae ducimus enim.
  //               </p>
  //             </div>
  //           </article>
  //         </div>
  //       </div>
  //     </section>
  //     {/* <!-- Service Area End --> */}

  //     {/* <!-- Contact us Area Start --> */}
  //     <section id="contact" className="py-16">
  //       <div className="container__main grid grid-cols-1 lg:grid-cols-3 gap-10">
  //         <div className="px-10 py-8 shadow border bg-gray-50">
  //           <h3 className="text-sky-500 font-semibold text-2xl">Get in Touch</h3>
  //           <p className="text-gray-600 mt-1">
  //             Just say Hello! Let us know more about you.
  //           </p>
  //           <div className="mt-5">
  //             <div className="flex gap-7 py-6 border-b">
  //               <i
  //                 className="fa-solid fa-location-dot text-2xl inline-block text-sky-500"
  //               ></i>
  //               <div>
  //                 <h4 className="text-gray-600 text-lg font-semibold">Location:</h4>
  //                 <p className="text-sm text-gray-600">
  //                   A108 Adam Street, New York, NY 535022
  //                 </p>
  //               </div>
  //             </div>
  //             <div className="flex gap-7 py-6 border-b">
  //               <i
  //                 className="fa-solid fa-envelope text-2xl inline-block text-sky-500"
  //               ></i>
  //               <div>
  //                 <h4 className="text-gray-600 text-lg font-semibold">Email:</h4>
  //                 <p className="text-sm text-gray-600">info@example.com</p>
  //               </div>
  //             </div>
  //             <div className="flex gap-7 py-6">
  //               <i
  //                 className="fa-solid fa-mobile-screen-button text-2xl inline-block text-sky-500"
  //               ></i>
  //               <div>
  //                 <h4 className="text-gray-600 text-lg font-semibold">Call:</h4>
  //                 <p className="text-sm text-gray-600">+1 5589 55488 55</p>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //         <div className="col-span-1 lg:col-span-2">
  //           <div className="flex justify-between flex-col sm:flex-row sm:gap-7">
  //             <input
  //               type="text"
  //               className="input__field mb-7"
  //               placeholder="Your Name"
  //             />
  //             <input
  //               type="email"
  //               className="input__field mb-7"
  //               placeholder="Your Email"
  //             />
  //           </div>
  //           <input type="text" className="input__field mb-7" placeholder="Subject" />
  //           <textarea
  //             className="input__field mb-7"
  //             placeholder="Message"
  //             rows={8}
  //           ></textarea>
  //           <div className="text-center">
  //             <button className="rounded__btn px-10 py-3 text-base rounded">
  //               Send Message
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     </section>
  //     {/* <!-- Contact us Area End --> */}
  //   </main>
  // );
}

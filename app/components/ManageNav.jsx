export default function ManageNav() {
   return (
      <>
         <nav className="flex min-h-[14vh] top-0 fixed w-full items-center bg-black bg-opacity-5 px-4">
            <div className="flex justify-center itens-center w-1/2">
               <img className="h-[10vh]" src="/logo.webp" alt="logo" />
            </div>
            <ul className="flex justify-center items-center space-x-4 w-1/2 montserrat font-medium text-sm">
               <li><a href="https://www.vameplease.com">Public</a></li>
               <li><a href="/">Dashboard</a></li>
            </ul>
         </nav>
      </>
   );
}
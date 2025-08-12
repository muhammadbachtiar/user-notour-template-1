import { Link } from "react-router-dom";
import AppHeader from "../../components/app-layout/headerApp";
import FooterApp from "../../components/app-layout/footerApp";

const NotFound = () => {

  return (
    <div className="min-h-screen bg-white  justify-center pb-16 md:pb-0">
            <AppHeader />
                <div className="flex flex-col text-center items-center justify-center h-[90vh] w-full bg-gray-100 text-gray-700">
                    <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
                    <p className="mt-2 text-lg">Halaman yang kamu cari tidak ditemukan.</p>
                    <Link to="/" className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Kembali ke Beranda
                    </Link>
                </div>
            <FooterApp/>
        </div>
  );
};

export default NotFound;

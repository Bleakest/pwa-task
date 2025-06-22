import { Outlet } from 'react-router-dom';
import Header from '../ui/Header';
import { Suspense } from 'react';
import ErrorBoundary from '../components/ErrorBoundary';

const Layout = () => {
    return (
        <>
            <Header />
            <div className='mx-[200px]'>
                <ErrorBoundary
                    fallback={
                        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                            <h2>Something went wrong</h2>
                            <button
                                onClick={() => window.location.reload()}
                                className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Reload Page
                            </button>
                        </div>
                    }
                >
                    <Suspense fallback={<h1>Loading...</h1>}>
                        <Outlet />
                    </Suspense>
                </ErrorBoundary>
            </div>
        </>
    );
};

export default Layout;
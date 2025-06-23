import React from 'react'
const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="bg-gray-900 text-white p-4 text-center">
            <p>Copyright &copy; {currentYear} Get Me a Chai - Fund your projects with Chai</p>
        </footer>
    )
}

export default Footer

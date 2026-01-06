

export default function Footer() {
    
    return(
        <footer className="border-t bg-white py-4">
            <p className="text-center text-sm text-gray-500">
                © {new Date().getFullYear()} Lojinha do Bairro
            </p>
        </footer>
    )
}
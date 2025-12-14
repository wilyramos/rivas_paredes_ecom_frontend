import Image from "next/image";

export default function Logo() {

    return (
        <Image
            src="/logocompleto.png"
            alt="Logo"
            width={100}
            height={100}
            quality={20}
            className="w-auto h-8 md:h-10"
        />
    );
}
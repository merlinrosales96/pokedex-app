import { Image } from "../atoms/Image";
import logo from "../assets/404.png";
import { Typography, Button } from "@mui/material";


export default function NotFound() {

    return (
        <section className="w-full h-auto flex flex-col items-center justify-center relative lg:px-24 md:px-20 px-6">
            <main className="w-full pt-32 pb-20 flex flex-col gap-3 items-center justify-center">
                <div className="max-w-5xl px-4 md:px-6 text-center">
                    <Image image={logo} alt="" className="w-2/3 h-2/3 items-center justify-center mx-auto overflow-hidden rounded-xl w-fit h-fit object-center" />
                    <Button href={`/pokedex/1`} variant="contained" color="error" className="pt-5">
                        <Typography variant="button">
                            Go Pokédex
                        </Typography>
                    </Button>
                </div>
            </main>
        </section>
    )
}
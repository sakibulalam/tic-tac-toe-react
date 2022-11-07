import React from "react";
import {ReactComponent as GithubIcon} from "../assets/github.svg";
import {ReactComponent as StackOverflowIcon} from "../assets/stackoverflow.svg";
import {ReactComponent as LinkedInIcon} from "../assets/linkedin.svg";

const SocialBar: React.FC = () =>
    <div className="grid grid-cols-3 w-100 md:w-2/12 p-2 self-center place-content-end">
        <a className="aspect-square" href="https://github.com/sakibulalam/"
           aria-label="Github Profile Link" target="_blank" rel="noopener noreferrer">
            <GithubIcon className="h-10 m-auto align-text-bottom"/>
        </a>
        <a className="aspect-square" href="https://stackoverflow.com/users/1626321/sakibul-alam"
           aria-label="StackOverflow Profile Link" target="_blank" rel="noopener noreferrer">
            <StackOverflowIcon className="h-10 m-auto align-text-bottom"/>
        </a>
        <a className="aspect-square" href="https://www.linkedin.com/in/sakibul-alam/"
           aria-label="LinkedIn Profile Link" target="_blank" rel="noopener noreferrer">
            <LinkedInIcon className="h-10 m-auto align-text-bottom"/>
        </a>
    </div>

export default SocialBar;
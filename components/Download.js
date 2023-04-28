import Button from "@/components/Button";
import {Link} from "@mui/material";
import React from "react";
import { t } from '@lingui/macro';
import styled from "styled-components";

const gradient = styled.span`
  background-image: linear-gradient(to right, #c3ff36, #55d56e, #7fffff);
  -webkit-background-clip: text;
`;

const DownloadButton = () => {
return (

        <Link
            href={`/application/HashDNA-Art-Engine2.1.0.zip`}
            color="#ffffff"
            sx={{
                textDecoration: 'none',
            }}
        >
            <Button display={{ md: '160px', sm: '130px', xs: '100px' }} variant="gradient"  marginBottom={2}>
                {t`DOWNLOAD`}
            </Button>
        </Link>

    );
};

export default DownloadButton;


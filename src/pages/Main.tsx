import { Box, Grid, Typography } from "@mui/material";
import img from "../assets/img/rickandmorty.jpg";

export default function Main() {
  return (
    <Box component="section" sx={{ py: 4 }}>
      <Grid justifyContent={"center"} container alignItems="center" spacing={4}>
        <Grid>
          <Box
            component="img"
            src={img}
            alt="Rick and Morty"
            sx={{
              width: "100%",
              maxWidth: 500,
              borderRadius: 2,
              boxShadow: 3,
            }}
          />
        </Grid>

        <Grid textAlign={'center'}>
          <Typography color="info" variant="h4" component="h1" gutterBottom>
            Welcome!
          </Typography>

          <Typography variant="body1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
            quibusdam veniam fuga est pariatur, dolore quod, a, eum distinctio
            voluptatem fugiat aliquam atque? Vel explicabo praesentium, iure
            qui, accusantium, a dolorum laudantium possimus doloribus est hic.
            Dicta in amet, facilis, quae quasi, eligendi vero omnis suscipit
            ratione vitae nemo? Aspernatur quam architecto voluptate iusto,
            perspiciatis neque ea esse officia sit delectus assumenda dicta sed
            libero eveniet totam vel et aliquid consequuntur iste at ullam
            dolorem. Corrupti dolorem ducimus accusantium iure sint enim rem,
            corporis molestiae fugit delectus iste dicta provident et sequi
            voluptates eligendi nam expedita itaque cumque quaerat culpa.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

import moduleAlias from "module-alias";

if (process.env.NODE_ENV !== "development") moduleAlias();

import app from "@infrastructure/http/application";

const PORT = app.get("PORT");

app.listen(PORT, () => console.log(`*Server listening on port ${PORT}*`));

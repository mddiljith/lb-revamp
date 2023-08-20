import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

module.exports = async (req, res) => {
  const supabaseServerClient = createPagesServerClient({
    req,
    res,
  });
  //as per the previous setup

  const {
    data: { user },
  } = await supabaseServerClient.auth.getUser();

  //or

  const {
    data: { session },
  } = await supabaseServerClient.auth.getSession();
};

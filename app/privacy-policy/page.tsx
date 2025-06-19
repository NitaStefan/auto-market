import React from "react";

const Page = () => {
  return (
    <div className="mx-auto max-w-3xl bg-white p-6">
      <h1 className="text-primary mb-4 text-3xl font-bold">Privacy Policy</h1>

      <p className="mb-4">
        This application is used by the administrators of an automotive business
        that offers second-hand car sales, car dismantling, and towing services.
      </p>

      <p className="mb-4">
        The application connects to the Facebook Graph API to publish public
        posts on the business’s official Facebook Page. These posts promote
        available cars also listed on this website.
      </p>

      <p className="mb-4">
        Only the two administrators (the business owner and a technical
        assistant) use this application. No personal data is collected, stored,
        or shared through the app.
      </p>

      <p className="mb-4">
        We do not access or process any user-level data, and no information is
        shared with third parties.
      </p>
    </div>
  );
};

export default Page;

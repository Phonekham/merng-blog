import React, { useState, useMemo } from "react";
import { toast } from "react-toastify";

const PostUpdate = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="container p-5">
      {loading ? <h4 className="text-danger">Loading</h4> : <h4>update</h4>}
    </div>
  );
};

export default PostUpdate;

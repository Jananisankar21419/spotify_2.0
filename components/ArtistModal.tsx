"use client";
import Modal from "./Modal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import useArtistModal from "@/hooks/useArtistModal";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Input from "./Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "./Button";
import toast from "react-hot-toast";
import uniqid from "uniqid";
const ArtistModal = () => {
  const artistModal = useArtistModal();
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      description: "",
      followers: 0,
      picture: null,
      facebook: "",
      instagram: "",
      linkedin: "",
      twitter: "",
    },
  });

  //if its not open , reset and close
  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      artistModal.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      //if the loading process happens,
      setIsLoading(true);
      const pictureFile = values?.picture?.[0];
      if (!pictureFile || !user || errors.author) {
        toast.error("Required Fields here");
        return;
      }
      const uniqueId = uniqid();
      //upload the image to storage
      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from("images")
          .upload(`artist-image-${uniqueId}`, pictureFile, {
            cacheControl: "3600",
            upsert: false,
          });

      if (imageError) {
        console.log(imageError);
        setIsLoading(false);
        return toast.error("failed to upload an image");
      }
      //storing the data into database
      const { error: supabaseError } = await supabaseClient
        .from("artists")
        .insert({
          author: values.author,
          description: values.description,
          followers: 0,
          picture: imageData.path,
          facebook: values.facebook,
          instagram: values.instagram,
          linkedin: values.linkedin,
          twitter: values.twitter,
        });
      if (supabaseError) {
        console.log(supabaseError);
        setIsLoading(false);
        return toast.error("failed to upload  the data");
      }
      //artist created, reset , close, then refresh
      toast.success("Artist created");
      reset();
      artistModal.onClose();
      router.refresh();
    } catch (error) {
      toast.error("something went wrong try again later..");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title=" Add a new Artist "
      description="Create your own artist"
      isOpen={artistModal.isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        {errors.author && (
          <div className="w-full flex-items items-end justify-end">
            <p className="text-xs text-red-500"> *Author name is required</p>
          </div>
        )}
        <div className="w-full flex-items items-end justify-end">
          <p className="text-xs text-red-500"> *Author name is required</p>
        </div>
        <Input
          id="author"
          disabled={isLoading}
          {...register("author", { required: true })}
          placeholder="Artist Name"
        />
        <Input
          id="description"
          disabled={isLoading}
          {...register("description", { required: true })}
          placeholder=" Artist Description here.."
        />

        {errors.picture && (
          <div className="w-full flex-items items-end justify-end">
            <p className="text-xs text-red-500"> *Author picture is required</p>
          </div>
        )}

        {/*image upload section*/}
        <div>
          <div className="pb-1"> Select an image file</div>
          <Input
            id="picture"
            disabled={isLoading}
            type="file"
            accept="image/*"
            {...register("picture", { required: true })}
            placeholder="Artist picture here"
          />
        </div>

        {/**facebook*/}
        <Input
          id="facebook"
          disabled={isLoading}
          {...register("facebook")}
          placeholder=" https://www.facebook.com"
        />
        {/*instagram */}
        <Input
          id="Instagram"
          disabled={isLoading}
          {...register("instagram")}
          placeholder=" https://www.instagram.com"
        />
        {/*twitter */}
        <Input
          id="twitter"
          disabled={isLoading}
          {...register("twitter")}
          placeholder="https://www.twitter.com"
        />
        {/*linkedin*/}
        <Input
          id="linkedin"
          disabled={isLoading}
          {...register("linkedin")}
          placeholder="https:// www.linkedin.com"
        />

        <Button disabled={isLoading} type="submit">
          Create
        </Button>
      </form>
    </Modal>
  );
};

export default ArtistModal;

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePost } from "@/context/postContext";
import { ImagePlus } from "lucide-react";
import React, { useState } from "react";
import { X } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

const Write = () => {
  const { createPost, loading } = usePost();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);

    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }
    try {
      await createPost(formData);
      if (!loading) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline"],
      ["link"],
      ["blockquote"],
      ["code-block"],
    ],
  };

  return (
    <>
      <div className="container mx-auto px-5 md:px-10 py-7">
        <h1 className="text-xl text-gray-900 dark:text-white mb-7 md:mb-5 border-b pb-4">
          Create New Blog
        </h1>
        <Tabs defaultValue="write">
          <TabsList className="grid w-full grid-cols-2 mb-7 lg:w-[400px]">
            <TabsTrigger value="write">Write</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="write" className="space-y-6">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="flex flex-col md:flex-row gap-14">
                <div className="basis-[70%]">
                  <Label
                    htmlFor="title"
                    className="text-gray-700 dark:text-white text-lg"
                  >
                    Title
                  </Label>
                  <Input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-2"
                    required
                  />
                  <div className="mt-5">
                    <Label
                      htmlFor="content"
                      className="text-gray-700 dark:text-white text-lg"
                    >
                      Content
                    </Label>
                    <ReactQuill
                      theme="snow"
                      modules={modules}
                      placeholder="Write something..."
                      className="h-96 mb-12 mt-2"
                      onChange={setContent}
                      value={content}
                    />
                  </div>
                </div>
                <div className="basis-[30%] space-y-6">
                  <div>
                    <Label
                      htmlFor="category"
                      className="text-gray-700 dark:text-white text-lg mb-2"
                    >
                      Category
                    </Label>
                    <Select onValueChange={setCategory} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Categories</SelectLabel>
                          <SelectItem value="AI">AI</SelectItem>
                          <SelectItem value="Coding">Coding</SelectItem>
                          <SelectItem value="Fashion">Fashion</SelectItem>
                          <SelectItem value="Food">Food</SelectItem>
                          <SelectItem value="Technology">Technology</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700 dark:text-white text-lg">
                      Cover Image
                    </Label>
                    <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6">
                      <Label
                        htmlFor="cover-image"
                        className="flex cursor-pointer flex-col items-center"
                      >
                        {image ? (
                          <div className="relative h-40 w-full rounded-lg overflow-hidden">
                            <button
                              onClick={() => {
                                setImage(null);
                                setThumbnail(null);
                              }}
                              className="absolute top-2 right-2 bg-white rounded-full p-1"
                            >
                              <X className="h-6 w-6 text-gray-700 dark:text-white" />
                            </button>
                            <img
                              src={image}
                              alt="Cover Preview"
                              className="h-40 w-full object-cover rounded-lg"
                            />
                          </div>
                        ) : (
                          <>
                            <ImagePlus className="h-12 w-12 text-gray-400" />
                            <span className="mt-2 text-sm font-medium text-gray-700">
                              Upload Cover Image
                            </span>
                            <span className="mt-1 text-xs text-gray-500">
                              PNG, JPG, GIF up to 10MB
                            </span>
                          </>
                        )}
                        <input
                          id="cover-image"
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </Label>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full mt-6 bg-blue-800 hover:bg-blue-700"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="size-6 rounded-full border-4 border-gray-300 border-r-blue-600 dark:border-neutral-200 dark:border-r-black animate-spin"></div>
                    ) : (
                      <p>Publish</p>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="preview" className="space-y-6">
            {content || title ? (
              <div>
                <h1 className="text-2xl font-bold mb-3 pl-4">{title}</h1>
                <div
                  className="ql-editor"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-300 text-center rounded-3xl bg-gray-100 dark:bg-neutral-900 p-4">
                No content to preview
              </p>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Write;

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
import { ImagePlus } from "lucide-react";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Write = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);

  console.log(content);

  const handleSubmit = (e) => {
    e.preventDefault();
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
            <form>
              <div className="flex gap-14">
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
                <div className="basis-[30%] space-y-3">
                  <div>
                    <Label
                      htmlFor="category"
                      className="text-gray-700 dark:text-white text-lg mb-2"
                    >
                      Category
                    </Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Categories</SelectLabel>
                          <SelectItem value="react">React</SelectItem>
                          <SelectItem value="nextjs">Next.js</SelectItem>
                          <SelectItem value="typescript">TypeScript</SelectItem>
                          <SelectItem value="javascript">JavaScript</SelectItem>
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
                        <ImagePlus className="h-12 w-12 text-gray-400" />
                        <span className="mt-2 text-sm font-medium text-gray-700">
                          Upload Cover Image
                        </span>
                        <span className="mt-1 text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </span>
                        <input
                          id="cover-image"
                          type="file"
                          className="hidden"
                          accept="image/*"
                        />
                      </Label>
                    </div>
                  </div>
                  <Button className="w-full">Publish</Button>
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
              <div className="text-gray-700 dark:text-white text-lg">
                No content to preview
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Write;

import typeCreamService from "~/services/api/type_Cream.service";

export const useTypeCream = () => {
  const token = useCookie<string>("token").value;
  const typeCreamServiceInstance = async (data: any, files: File[]) => {
    const channel = useCookie("channel").value;
    const formData = new FormData();
    const id = "PRD" + Date.now();
    formData.append("id", id);
    formData.append("channel", channel as string);
    formData.append("bland", data.type);
    formData.append("name", data.name);
    formData.append("price1", data.price1);
    formData.append("price2", data.price2);
    formData.append("detail", data.description);
    formData.append("tel", data.phone);
    files.forEach((file) => {
      formData.append("files", file); // 👈 must repeat for each file
    });
    const resp = await typeCreamService.typeCreamInsert(formData, token);
    return resp.success;
  };
  return {
    typeCreamServiceInstance,
  };
};

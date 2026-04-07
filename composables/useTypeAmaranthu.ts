import typeAmaranthusService from "~/services/api/type_amaranthus.service";
export const useTypeAmaranthu = () => {
    const totken = useCookie<string>('token').value;

    const TypeAmaranthusItemInsert = async (data: any, files: File[]) => {
        const channel = useCookie('channel').value;
        const formData = new FormData();
        const id = "PRD" + Date.now();
        formData.append("id", id);
        formData.append("channel", channel as string);
        formData.append("name", data.name);
        formData.append("price1", data.price1);
        formData.append("price2", data.price2);
        formData.append("price3", data.price3);
        formData.append("moreDetail", data.moredetail);
        formData.append("type", data.type);
        formData.append("totalRoom", data.totalRoom);
        formData.append("activeRoom", data.activeroom);
        formData.append("locationvideo", data.locationvideo);
        formData.append("contactnumber", data.contactnumber);
        formData.append("province", data.province);
        formData.append("district", data.district);
        formData.append("village", data.village);
        formData.append("area", data.area);
        formData.append("tel", data.phone);
        files.forEach((file) => {
            formData.append("files", file); 
        });
        const resp = await typeAmaranthusService.getType_AmaranthusInsert(formData, totken);
        return resp.success;
    }
    return {
        TypeAmaranthusItemInsert
    }
}

import { type ImageProps, getImageProps } from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

type Props = Omit<ImageProps, "fill">;

export default function NextAvatar(props: Props) {
  const imageProps = getImageProps({ width: 40, height: 40, ...props }).props;

  // Helper functions to replace lodash pick and omit
  const pick = <T extends object, K extends keyof T>(
    obj: T,
    keys: K[],
  ): Pick<T, K> => {
    return keys.reduce(
      (acc, key) => {
        if (obj.hasOwnProperty(key)) {
          acc[key] = obj[key];
        }
        return acc;
      },
      {} as Pick<T, K>,
    );
  };

  const omit = <T extends object, K extends keyof T>(
    obj: T,
    keys: K[],
  ): Omit<T, K> => {
    const result = { ...obj };
    keys.forEach((key) => delete result[key]);
    return result;
  };

  return (
    <Avatar
      className={props.className}
      style={pick(imageProps, ["width", "height"])}
    >
      <AvatarImage
        {...omit(imageProps, ["style"])}
        style={pick(imageProps.style, ["objectFit", "objectPosition"])}
      />
      {imageProps.placeholder === "blur" && (
        <AvatarFallback style={imageProps.style} />
      )}
    </Avatar>
  );
}

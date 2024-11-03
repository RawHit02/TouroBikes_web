import moment from "moment";
export const generateImageFromBase64 = (base64: string) => {
  const src = `data:image;base64,${base64}`;
  return src;
};
export const convertBase64ToFile = (base64String: string): File | null => {
  const match = base64String.match(/^data:(.+);base64,(.+)$/);
  if (!match) {
    console.error("Invalid base64 string");
    return null;
  }

  const mimeType = match[1];
  const base64Data = match[2];
  const filenameMatch = mimeType.match(/\/(.+)$/);
  const filename = filenameMatch ? `file.${filenameMatch[1]}` : "file";

  const byteCharacters = atob(base64Data);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: mimeType });

  return new File([blob], filename, { type: mimeType });
};

export const generatePaginationOptions = (
  currentPage: number,
  rowsPerPage: number
) => {
  const skip = currentPage * rowsPerPage;
  const limit = rowsPerPage;

  return { skip, limit };
};

export const currentDate = (): string => {
  // Ensure the input date is a valid date string
  const dateMoment = moment().format();
  return dateMoment;
};

export const formatCommentDate = (
  inputDate: string,
  outputFormat: string = "DD MMM, YYYY"
): string => {
  // Ensure the input date is a valid date string
  const dateMoment = moment(inputDate);
  if (!dateMoment.isValid()) {
    // Handle invalid date input as needed
    return "Invalid Date";
  }

  // Format the date using the provided or default format
  const formattedDate: string = dateMoment.format(outputFormat);
  return formattedDate;
};

export const formatDate = (
  inputDate: string,
  outputFormat: string = "DD MMM, YYYY hh:mm A"
): string => {
  // Ensure the input date is a valid date string
  const dateMoment = moment(inputDate);
  if (!dateMoment.isValid()) {
    // Handle invalid date input as needed
    return "Invalid Date";
  }

  // Format the date using the provided or default format
  const formattedDate: string = dateMoment.format(outputFormat);
  return formattedDate;
};

interface DecodedToken {
  exp: number;
}

export function isValidStyledData(data: any) {
  try {
    if (data) {
      const parsedData = JSON.parse(data);
      if (data && parsedData.blocks) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error checking validity:", error);
    return false;
  }
}

export function indexToColumnName(index: number) {
  let columnName = "";
  let dividend = index + 1; // Adding 1 because Excel columns start at 1, not 0

  while (dividend > 0) {
    let modulo = (dividend - 1) % 26;
    columnName = String.fromCharCode(97 + modulo) + columnName;
    dividend = Math.floor((dividend - modulo) / 26);
  }

  return columnName;
}

export function extractYearFromString(inputString: string) {
  const yearPattern = /\d{4}/; // This regular expression matches four consecutive digits

  const match = inputString.match(yearPattern);

  if (match) {
    return match[0]; // Return the matched year as a string
  } else {
    return null; // Return null if year not found in the input string
  }
}
export const checkforWordsCount = (wordCount: number) => {
  return wordCount <= 150 || "Please enter 150 words or less";
};

export const checkforWordsCountForPhoneNumber = (wordCount: number) => {
  return wordCount <= 15 || "Please enter valid phone number";
};

export const typeOfPartnerOrg = (partnerKey: string): string => {
  const data = [
    {
      key: "ngo",
      value: "NGO",
    },
    {
      key: "academic_institution",
      value: "Academic Institution",
    },
    {
      key: "private_sector_company",
      value: "Private Sector Company",
    },
  ];
  return data.find((el) => el.key === partnerKey)?.value || "";
};

export const contactDirectlyPartnerOrg = (partnerKey: string): string => {
  const data = [
    {
      key: "true",
      value: "Yes",
    },
    {
      key: "false",
      value: "No",
    },
  ];
  return data.find((el) => el.key === partnerKey)?.value || "";
};

export const typeOfPartner = (partnerKey: string): string => {
  const data = [
    {
      key: "target_partner",
      value: "Target Partner",
    },
    {
      key: "proposed_partner",
      value: "Proposed Partner",
    },
    {
      key: "engaged_partner",
      value: "Engaged Partner",
    },
    {
      key: "official_initiative_partner",
      value: "Official Initiative Partner",
    },
  ];
  return data.find((el) => el.key === partnerKey)?.value || "";
};

export const budgetStatus = (statusKey: string): string => {
  const data = [
    {
      key: "no_match_funding_identified_yet",
      value: "No match funding identified yet",
    },
    {
      key: "potential_match_funding_identified",
      value: "Potential match funding identified",
    },
    {
      key: "application_in_progress",
      value: "Application in progress",
    },
    {
      key: "match_funding_secured",
      value: "Match funding secured",
    },
    {
      key: "other",
      value: "Other",
    },
  ];
  return data.find((el) => el.key === statusKey)?.value || "";
};

import {
  Box,
  Card,
  Text,
  BlockStack,
  InlineGrid,
  TextField,
  useBreakpoints,
  Divider,
  Page,
  Layout
} from "@shopify/polaris";

export default function Settings() {
  const { smUp } = useBreakpoints();

  return (
    <Page title="Settings">
      <Layout>
        <Layout.Section>
          <BlockStack gap={{ xs: "800", sm: "400" }}>
            
            {/* ---- Section 1: InterJambs ---- */}
            <InlineGrid columns={{ xs: "1fr", md: "2fr 5fr" }} gap="400">
              <Box
                as="section"
                paddingInlineStart={{ xs: 400, sm: 0 }}
                paddingInlineEnd={{ xs: 400, sm: 0 }}
              >
                <BlockStack gap="400">
                  <Text as="h3" variant="headingMd">
                    InterJambs
                  </Text>
                  <Text as="p" variant="bodyMd">
                    Interjambs are the rounded protruding bits of your puzzle piece.
                  </Text>
                </BlockStack>
              </Box>

              <Card roundedAbove="sm">
                <BlockStack gap="400">
                  <TextField label="Interjamb style" placeholder="Enter style" />
                  <TextField label="Interjamb ratio" placeholder="Enter ratio" />
                </BlockStack>
              </Card>
            </InlineGrid>

            {smUp ? <Divider /> : null}

            {/* ---- Section 2: Dimensions ---- */}
            <InlineGrid columns={{ xs: "1fr", md: "2fr 5fr" }} gap="400">
              <Box
                as="section"
                paddingInlineStart={{ xs: 400, sm: 0 }}
                paddingInlineEnd={{ xs: 400, sm: 0 }}
              >
                <BlockStack gap="400">
                  <Text as="h3" variant="headingMd">
                    Dimensions
                  </Text>
                  <Text as="p" variant="bodyMd">
                    Set dimensions for your puzzle pieces to adjust fitting accuracy.
                  </Text>
                </BlockStack>
              </Box>

              <Card roundedAbove="sm">
                <BlockStack gap="400">
                  <TextField label="Horizontal" placeholder="Enter horizontal size" />
                  <TextField label="Vertical" placeholder="Enter vertical size" />
                </BlockStack>
              </Card>
            </InlineGrid>

          </BlockStack>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

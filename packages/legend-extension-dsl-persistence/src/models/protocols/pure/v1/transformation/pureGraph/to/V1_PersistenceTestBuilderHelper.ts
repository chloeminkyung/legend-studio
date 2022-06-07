/**
 * Copyright (c) 2020-present, Goldman Sachs
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { guaranteeType, UnsupportedOperationError } from '@finos/legend-shared';
import { ExternalFormatData } from '../../../../../../../../../legend-graph/src/models/metamodels/pure/data/EmbeddedData';
import { EqualTo } from '../../../../../../../../../legend-graph/src/models/metamodels/pure/test/assertion/EqualTo';
import { EqualToJson } from '../../../../../../../../../legend-graph/src/models/metamodels/pure/test/assertion/EqualToJson';
import {
  EqualToTDS,
  RelationalTDS,
} from '../../../../../../../../../legend-graph/src/models/metamodels/pure/test/assertion/EqualToTDS';
import type { TestAssertion } from '../../../../../../../../../legend-graph/src/models/metamodels/pure/test/assertion/TestAssertion';
import type {
  AtomicTest,
  TestSuite,
} from '../../../../../../../../../legend-graph/src/models/metamodels/pure/test/Test';
import { V1_PersistenceTest } from '../../../model/packageableElements/persistence/V1_DSLPersistence_PersistenceTest';
import { V1_PersistenceTestSuite } from '../../../model/packageableElements/persistence/V1_DSLPersistence_PersistenceTestSuite';
import { V1_EqualTo } from '../../../../../../../../../legend-graph/src/models/protocols/pure/v1/model/test/assertion/V1_EqualTo';
import { V1_EqualToJson } from '../../../../../../../../../legend-graph/src/models/protocols/pure/v1/model/test/assertion/V1_EqualToJson';
import { V1_EqualToTDS } from '../../../../../../../../../legend-graph/src/models/protocols/pure/v1/model/test/assertion/V1_EqualToTDS';
import type { V1_TestAssertion } from '../../../../../../../../../legend-graph/src/models/protocols/pure/v1/model/test/assertion/V1_TestAssertion';
import type { V1_AtomicTest } from '../../../../../../../../../legend-graph/src/models/protocols/pure/v1/model/test/V1_AtomicTest';
import type { V1_TestSuite } from '../../../../../../../../../legend-graph/src/models/protocols/pure/v1/model/test/V1_TestSuite';
import type { V1_GraphBuilderContext } from '@finos/legend-graph';
import { V1_ProtocolToMetaModelEmbeddedDataBuilder } from '../../../../../../../../../legend-graph/src/models/protocols/pure/v1/transformation/pureGraph/to/helpers/V1_DataElementBuilderHelper';
import {
  V1_buildPersistenceTest,
  V1_buildPersistenceTestSuite,
} from './V1_PersistenceBuilder';

const buildEqualTo = (
  element: V1_EqualTo,
  parentTest: AtomicTest | undefined,
): EqualTo => {
  const equalTo = new EqualTo();
  equalTo.id = element.id;
  equalTo.parentTest = parentTest;
  equalTo.expected = element.expected;
  return equalTo;
};

const buildEqualToJson = (
  element: V1_EqualToJson,
  parentTest: AtomicTest | undefined,
  context: V1_GraphBuilderContext,
): EqualToJson => {
  const equalToJson = new EqualToJson();
  equalToJson.id = element.id;
  equalToJson.parentTest = parentTest;
  equalToJson.expected = guaranteeType(
    element.expected.accept_EmbeddedDataVisitor(
      new V1_ProtocolToMetaModelEmbeddedDataBuilder(context),
    ),
    ExternalFormatData,
  );
  return equalToJson;
};

const buildEqualToTDS = (
  element: V1_EqualToTDS,
  parentTest: AtomicTest | undefined,
  context: V1_GraphBuilderContext,
): EqualToTDS => {
  const equalToTDS = new EqualToTDS();
  equalToTDS.id = element.id;
  equalToTDS.parentTest = parentTest;
  const expected = new RelationalTDS();
  expected.columns = element.expected.columns;
  expected.rows = element.expected.rows;
  equalToTDS.expected = expected;
  return equalToTDS;
};

export const V1_buildAtomicTest = (
  value: V1_AtomicTest,
  parentSuite: TestSuite | undefined,
  context: V1_GraphBuilderContext,
): AtomicTest => {
  if (value instanceof V1_PersistenceTest) {
    return V1_buildPersistenceTest(value, parentSuite, context);
  }
  throw new UnsupportedOperationError(`Can't build atomic test`, value);
};

export const V1_buildTestAssertion = (
  value: V1_TestAssertion,
  parentTest: AtomicTest | undefined,
  context: V1_GraphBuilderContext,
): TestAssertion => {
  if (value instanceof V1_EqualTo) {
    return buildEqualTo(value, parentTest);
  } else if (value instanceof V1_EqualToJson) {
    return buildEqualToJson(value, parentTest, context);
  } else if (value instanceof V1_EqualToTDS) {
    return buildEqualToTDS(value, parentTest, context);
  }
  throw new UnsupportedOperationError(`Can't build test assertion`, value);
};

export const V1_buildTestSuite = (
  value: V1_TestSuite[],
  context: V1_GraphBuilderContext,
): TestSuite[] => {
  if (value instanceof V1_PersistenceTestSuite) {
    return V1_buildPersistenceTestSuite(value, context);
  }
  throw new UnsupportedOperationError(`Can't build test suite`, value);
};
